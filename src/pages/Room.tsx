import { useParams } from "react-router-dom";
import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import "../styles/room.scss";
import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { child, get, onValue, ref, set } from "firebase/database";
import { database } from "../services/firebase";

type FirebaseQuestions = Record<string, {
    author:{
        name: string;
        avatar: string;
    },
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;

}>;

type Question = {
    id: string;
    author:{
        name: string;
        avatar: string;
    },
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}


type RoomParams = {
    id: string;
}

export function Room(){
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const { user } = useAuth();
    const [ newQuestion, setNewQuestion ] = useState("");
    const [ questions, setQuestions ] = useState<Question[]>([]);
    const [ title, setTitle ] = useState("");

    useEffect(() => {
        console.log("roomId", roomId);

        const roomRef = ref(database, `rooms/${roomId}`);

        onValue(roomRef, (room) =>{
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key,value])=>{
                return{
                    id: key,
                    content: value.content,
                    author: value.author,
                    isAnswered: value.isAnswered,
                    isHighlighted: value.isHighlighted
                }
            });

            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        })
           
    },[roomId]);

    async function handleSendNewQuestion(event: FormEvent<HTMLFormElement>){
        event.preventDefault();

        if(newQuestion.trim() == ""){
            return;
        }

        if(!user){
            throw new Error("You must be logged in");
        }

        const question = {
            content: newQuestion,
            author:{
                name: user.name,
                avatar: user.avatar
            },
            isHighlighted: false,
            isAnswered: false
        }

        const roomRef = ref(database,`rooms/${roomId}`);
        const newHashQuestion = crypto.randomUUID();
        await set(child(roomRef,`questions/${newHashQuestion}`),question);

        setNewQuestion("");
    }

    return (
        <div id="page-room">
           <header>
            <div className="content">
                <img 
                    src={logoImg}
                    alt="Letmeask"
                />
                <RoomCode 
                    code={roomId!}
                />
            </div>
           </header>
           <main className="content">
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {   questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                <form
                    onSubmit={handleSendNewQuestion}
                >
                    <textarea 
                        placeholder="O que você quer perguntar?"
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />

                    <div className="form-footer">
                        { user ?
                            (
                                <div className="user-info">
                                    <img 
                                        src={user.avatar}
                                        alt={user.name}
                                    />
                                    <span>{user.name}</span>
                                </div>
                            ):(
                                <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
                            )
                        }
                        <Button
                            type="submit"
                            disabled={!user}
                        >
                            Enviar pergunta
                        </Button>
                    </div>
                </form>

                {JSON.stringify(questions)}
           </main>
        </div>
    );
}