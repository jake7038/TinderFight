import { useState } from 'react'
import { Principal } from '../principal/principal'
import Conversa from '../conversa/conversa'
import Chat from '../chat/chat'
import './desktopLayout.css'

export function DesktopLayout() {
    const [chatAberto, setChatAberto] = useState<{
        conversaId: string;
        nomeMatch: string;
        foto: string;
    } | null>(null)

    return (
        <div className="desktop-layout">
            <div className="desktop-left">
                <Principal />
            </div>
            <div className="desktop-right">
                {chatAberto
                    ? <Chat 
                        desktopProps={chatAberto} 
                        onVoltar={() => setChatAberto(null)} 
                    />
                    : <Conversa onOpenChat={setChatAberto} />
                }
            </div>
        </div>
    )
}