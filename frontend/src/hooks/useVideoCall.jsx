import { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import { socketServerURL } from "../components/videollamadas/socket-provider.jsx";

/* const servers = {
  iceServers: [
    { urls: "stun:freestun.net:3478" },
    { urls: "turn:freestun.net:3478", username: "free", credential: "free" },
  ],
}; */

const servers = {
  iceServers: [
    {
      urls: "stun:stun.relay.metered.ca:80",
    },
    {
      urls: "turn:global.relay.metered.ca:80",
      username: "785f5f8bbf7d2e3b0132bdbe",
      credential: "Fb6ylRzdfZY0UoXy",
    },
    {
      urls: "turn:global.relay.metered.ca:80?transport=tcp",
      username: "785f5f8bbf7d2e3b0132bdbe",
      credential: "Fb6ylRzdfZY0UoXy",
    },
    {
      urls: "turn:global.relay.metered.ca:443",
      username: "785f5f8bbf7d2e3b0132bdbe",
      credential: "Fb6ylRzdfZY0UoXy",
    },
    {
      urls: "turns:global.relay.metered.ca:443?transport=tcp",
      username: "785f5f8bbf7d2e3b0132bdbe",
      credential: "Fb6ylRzdfZY0UoXy",
    },
  ],
};

export function useVideoCall(roomId) {
  const [hasVideo, setHasVideo] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);
  const [socketVideoId, setSocketVideoId] = useState(null);

  const socketRefVideo = useRef(null);
  const $peer = useRef(null);
  const $self = useRef(null);
  const webcamVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    if (!roomId || !servers) return;

    socketRefVideo.current = io(`${socketServerURL}/${roomId}`, {
      autoConnect: false,
    });

    registerScCallbacks();
    requestUserMedia($self.mediaConstraints);

    $self.current = {
      rtcConfig: servers,
      isPolite: false,
      isMakingOffer: false,
      isIgnoringOffer: false,
      isSettingRemoteAnswerPending: false,
      mediaConstraints: { audio: false, video: true },
    };

    $peer.current = {
      connection: new RTCPeerConnection($self.current.rtcConfig),
    };

    function handleRtcIceCandidate({ candidate }) {
      console.log("Attempting to handle an ICE candidate...");
      socketRefVideo.current.emit("signal", { candidate: candidate });
    }
    async function handleRtcConnectionNegotiation() {
      $self.current.isMakingOffer = true;
      console.log("Attempting to make an offer...");
      await $peer.current.connection.setLocalDescription();
      socketRefVideo.current.emit("signal", {
        description: $peer.current.connection.localDescription,
      });
      $self.current.isMakingOffer = false;
    }

    function handleRtcPeerTrack({ track, streams: [stream] }) {
      console.log("Attempt to display media from peer...");
      displayStream(stream, "#peer");
    }
    function registerRtcCallbacks(peer) {
      peer.connection.onnegotiationneeded = handleRtcConnectionNegotiation;
      peer.connection.onicecandidate = handleRtcIceCandidate;
      peer.connection.ontrack = handleRtcPeerTrack;
    }
    function establishCallFeatures(peer) {
      registerRtcCallbacks(peer);
      addStreamingMedia($self.current.media, peer);
    }
    function handleScConnect() {
      console.log(
        "***** Socket (/nspVideo) | conectado",
        socketRefVideo.current.id
      );
      setSocketVideoId(socketRefVideo.current.id);
      establishCallFeatures($peer.current);
    }
    function handleScDisconnectedPeer() {
      resetPeer($peer.current);
      establishCallFeatures($peer.current);
    }
    function resetPeer(peer) {
      displayStream(null, "#peer");
      peer.connection.close();
      peer.connection = new RTCPeerConnection($self.rtcConfig);
    }

    async function handleScSignal({ description, candidate }) {
      if (description) {
        const ready_for_offer =
          !$self.current.isMakingOffer &&
          ($peer.current.connection.signalingState === "stable" ||
            $self.current.isSettingRemoteAnswerPending);

        const offer_collision =
          description.type === "offer" && !ready_for_offer;

        $self.current.isIgnoringOffer =
          !$self.current.isPolite && offer_collision;

        if ($self.current.isIgnoringOffer) {
          return;
        }

        $self.current.isSettingRemoteAnswerPending =
          description.type === "answer";
        await $peer.current.connection.setRemoteDescription(description);
        $self.current.isSettingRemoteAnswerPending = false;

        if (description.type === "offer") {
          await $peer.current.connection.setLocalDescription();
          socketRefVideo.current.emit("signal", {
            description: $peer.current.connection.localDescription,
          });
        }
      } else if (candidate) {
        try {
          await $peer.current.connection.addIceCandidate(candidate);
        } catch (e) {
          if (
            !$self.current.isIgnoringOffer &&
            candidate.candidate.length > 1
          ) {
            console.error("Unable to add ICE candidate for peer:", e);
          }
        }
      }
    }

    async function requestUserMedia() {
      try {
        const permissionStatus = await navigator.permissions.query({
          name: "camera",
        });
        if (permissionStatus.state === "denied") {
          alert(
            "El acceso a la cámara está bloqueado. Verifica tus permisos en la configuración del navegador."
          );
          return;
        }
      } catch (error) {
        console.error("Error al verificar permisos:", error);
      }

      try {
        //$self.current.mediaStream = new MediaStream();
        $self.current.media = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setHasVideo(true);
        setHasAudio(true);
        //console.log("Got video and audio");
        // eslint-disable-next-line no-unused-vars
      } catch (e) {
        //console.warn("No se pudo acceder a la cámara y micrófono:", e);
        try {
          $self.current.media = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });
          setHasVideo(true);
          setHasAudio(false);
          //console.log("Got only video");
          // eslint-disable-next-line no-unused-vars
        } catch (e) {
          //console.warn("No se pudo acceder a la cámara:", e);
          try {
            $self.current.media = await navigator.mediaDevices.getUserMedia({
              video: false,
              audio: true,
            });
            setHasVideo(false);
            setHasAudio(true);
            //console.log("Got only audio");
            // eslint-disable-next-line no-unused-vars
          } catch (e) {
            //console.warn("No se pudo acceder al micrófono:", e);
            $self.current.media = new MediaStream();
            const silentAudioTrack = await createSilentAudioTrack();
            const silentVideoTrack = await createSilentVideoTrack();
            $self.current.media.addTrack(silentAudioTrack);
            $self.current.media.addTrack(silentVideoTrack);
            setHasVideo(false);
            setHasAudio(false);
          }
        }
      }

      displayStream($self.current.media, "#self");
    }

    function handleScConnectedPeer() {
      $self.current.isPolite = true;
    }

    function registerScCallbacks() {
      socketRefVideo.current.on("connect", handleScConnect);
      socketRefVideo.current.on("connected peer", handleScConnectedPeer);
      socketRefVideo.current.on("disconnected peer", handleScDisconnectedPeer);
      socketRefVideo.current.on("signal", handleScSignal);
      socketRefVideo.current.on("disconnect", () => {
        console.log("***** Socket (/nspVideo) | desconectado");

        setSocketVideoId(null);
      });
    }
    return () => {
      console.log(
        "***** Socket (/nspVideo)| Unmount",
        socketRefVideo.current.id
      );
      socketRefVideo.current.close();
    };
  }, [roomId]);

  async function createSilentVideoTrack() {
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const stream = canvas.captureStream();
    const track = stream.getVideoTracks()[0];
    track.enabled = false;
    return track;
  }

  async function createSilentAudioTrack() {
    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const dst = oscillator.connect(ctx.createMediaStreamDestination());
    oscillator.start();
    const track = dst.stream.getAudioTracks()[0];
    track.enabled = false;
    return track;
  }

  function addStreamingMedia(stream, peer) {
    if (stream) {
      for (let track of stream.getTracks()) {
        peer.connection.addTrack(track, stream);
      }
    }
  }

  function displayStream(stream, selector) {
    if (selector === "#peer") {
      remoteVideoRef.current.srcObject = stream;
    }
    if (selector === "#self") {
      webcamVideoRef.current.srcObject = stream;
    }
  }

  function joinCall() {
    socketRefVideo.current.open();
  }

  function leaveCall() {
    function resetPeer(peer) {
      displayStream(null, "#peer");
      peer.connection.close();
      peer.connection = new RTCPeerConnection($self.rtcConfig);
    }

    if ($self.current.media) {
      $self.current.media.getTracks().forEach((track) => track.stop());
    }
    socketRefVideo.current.close();
    resetPeer($peer.current);
  }

  return {
    hasVideo,
    hasAudio,
    webcamVideoRef,
    remoteVideoRef,
    joinCall,
    leaveCall,
    socketVideoId,
  };
}
