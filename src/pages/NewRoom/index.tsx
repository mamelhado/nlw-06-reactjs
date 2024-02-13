import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import ilustration from "../../assets/images/illustration.svg";
import logoImg from "../../assets/images/logo.svg";
import { Button } from "../../components/Button";
import "../../styles/auth.scss";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";
import { child, ref, set } from "firebase/database";

export function NewRoom(){
    const navigate = useNavigate();
    const [newRoom, setNewRoom ] = useState("");

    const { user, signInWithGoogle } = useAuth();

    async function handleCreateRoom(event : FormEvent<HTMLFormElement>){
        event.preventDefault();
        if(newRoom.trim() == ""){
            return;
        }

        const roomRef = ref(database, "rooms");

        const newHashIdRoom = crypto.randomUUID();

        await set(child(roomRef,newHashIdRoom), {
            title: newRoom,
            authorId: user?.id
        })
       

        navigate(`/rooms/${newHashIdRoom}`);
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
                    <h2>
                        Criar uma nova sala
                    </h2>
                    <form 
                        onSubmit={handleCreateRoom}
                    >
                        <input 
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event?.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">Criar sala</Button>
                    </form>
                    <p>
                        Quer entrar em uma sala já existente? <Link to="/">Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}