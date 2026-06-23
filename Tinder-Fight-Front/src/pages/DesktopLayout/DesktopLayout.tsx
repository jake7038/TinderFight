import { useState, useEffect } from 'react'
import { Principal } from '../principal/principal'
import Conversa from '../conversa/conversa'
import Chat from '../chat/chat'
import './desktopLayout.css'

interface DesktopLayoutProps {
    initialTab?: 'lutadores' | 'conversas'
}

export function DesktopLayout({ initialTab = 'lutadores' }: DesktopLayoutProps) {
    const [chatAberto, setChatAberto] = useState<{
        conversaId: string;
        nomeMatch: string;
        foto: string;
    } | null>(null)

    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 900)
    const [activeTab, setActiveTab] = useState<'lutadores' | 'conversas'>(initialTab)

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 900)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    if (isDesktop) {
        return (
            <div className="desktop-layout">
                <div className="desktop-left">
                    <Principal />
                </div>
                <div className="desktop-right">
                    {chatAberto
                        ? <Chat desktopProps={chatAberto} onVoltar={() => setChatAberto(null)} />
                        : <Conversa onOpenChat={setChatAberto} />
                    }
                </div>
            </div>
        )
    }

    return (
        <div className="mobile-layout">
            {chatAberto
                ? <Chat desktopProps={chatAberto} onVoltar={() => setChatAberto(null)} />
                : activeTab === 'lutadores'
                    ? <Principal onGoConversas={() => setActiveTab('conversas')} />
                    : <Conversa onOpenChat={setChatAberto} onGoLutadores={() => setActiveTab('lutadores')} />
            }
        </div>
    )
}