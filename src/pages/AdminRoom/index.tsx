import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useRoom } from "../../hooks/useRoom";
import { FormEvent, useState } from "react";
import { database } from "../../services/firebase";
import { child, ref, remove, set, update } from "@firebase/database";
import { Question } from "../../components/Question";
import { Button } from "../../components/Button";
import logoImg from "../../assets/images/logo.svg";
import deleteImg from "../../assets/images/delete.svg";
import { RoomCode } from "../../components/RoomCode";
import "./styles.scss";

type RoomParams = {
    id: string;
}

export function AdminRoom(){
    const params = useParams<RoomParams>();
    const { user } = useAuth();
    const navigate = useNavigate();
    const roomId = params.id!;
    const { title, questions} = useRoom(roomId);    


    async function handleDeleteQuestion(questionId: string){
        if(confirm("Tem certeza que deseja excluir essa pergunta?")){
            const questionRef = ref(database, `rooms/${roomId}/questions/${questionId}`);

            await remove(questionRef);
        }
    }

    async function handleEndRoom(){
        const questionRef = ref(database, `rooms/${roomId}`);

        update(questionRef, {
            endedAt: new Date()
        })

        navigate("/");
    }

    return (
        <div id="page-room">
           <header>
            <div className="content">
                <img 
                    src={logoImg}
                    alt="Letmeask"
                />
                <div>
                    <RoomCode 
                        code={roomId!}
                    />
                    <Button 
                        isOutlined
                        onClick={handleEndRoom}
                    >
                        Encerrar sala
                    </Button>
                </div>
            </div>
           </header>
           <main className="content">
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {   questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                <div className="question-list">
                {
                    questions.map((question)=>{
                        return (<Question 
                                    key={question.id}
                                    content={question.content}
                                    author={question.author}
                               >
                                <button 
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img 
                                        src={deleteImg}
                                        alt="Deletar pergunta"
                                    />
                                </button>
                               </Question>     
                                )
                        })
                }
                </div>
           </main>
        </div>
    );
}