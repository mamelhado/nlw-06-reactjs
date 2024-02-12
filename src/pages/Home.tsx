import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { database } from "../services/firebase";


import ilustration from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIcon from "../assets/images/google-icon.svg";
import { Button } from "../components/Button";
import "../styles/auth.scss";
import { useAuth } from "../hooks/useAuth";
import { FormEvent, useState } from "react";
import { get, ref } from "firebase/database";

export function Home(){
    const navigate = useNavigate();
    const { user, signInWithGoogle } = useAuth();

    const [roomCode, setRoomCode ] = useState("");

    async function handleCreateRoom(){
        if(!user){
            await signInWithGoogle();
        }

        navigate("/rooms/new");
    }

    async function handleJoinRoom(event: FormEvent<HTMLFormElement>){
        event.preventDefault();

        if(roomCode.trim() == "")
        {
            return;
        }

        const roomRef = ref(database,`rooms/${roomCode}`);

        const roomData = await get(roomRef);

        if(!roomData.exists()){
            alert("Room does not exists");
            return;
        }

        navigate(`/rooms/${roomCode}`);
    }

    return(
        <div id="page-auth">
            <aside>
                <img src={ilustration} alt="Ilustração simbolizando troca de mensaggens"/>
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Let me ask"/>
                    <button 
                        onClick={handleCreateRoom}
                        className="create-room">
                        <img 
                            src={googleIcon} 
                            alt="Logo do Google"
                        />
                        Crie sua sala com o Google
                    </button>

                    <div className="separator">
                        ou entre em uma sala
                    </div>
                    <form
                        onSubmit={handleJoinRoom}
                    >
                        <input 
                            type="text"
                            placeholder="Digite o codigo da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    );
}