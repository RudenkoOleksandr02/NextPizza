import React from 'react';
import {Button, Dialog, DialogContent, DialogTitle} from "@/components/ui";
import {signIn} from "next-auth/react";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
import {LoginForm} from "@/components/shared/modals/auth-modal/forms/login-form";
import {RegisterForm} from "@/components/shared/modals/auth-modal/forms/register-form";

interface Props {
  open: boolean;
  onClose: VoidFunction;
}

export const AuthModal: React.FC<Props> = ({ onClose, open }) => {
    const [type, setType] = React.useState<'login' | 'register'>('login');

    const handleClose = () => {
        onClose();
    }

    const onSwitchType = () => {
        setType(type === 'login' ? 'register' : 'login');
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <VisuallyHidden><DialogTitle>Авторизація</DialogTitle></VisuallyHidden>
            <DialogContent className="w-[450px] bg-white p-10">
                {type === 'login' ? (
                    <LoginForm onClose={handleClose} />
                ) : (
                    <RegisterForm onClose={handleClose} />
                )}

                <hr/>

                <div className="flex gap-2">
                    {/* GitHub */}
                    <Button
                        variant="secondary"
                        onClick={() =>
                            signIn('github', {
                                callbackUrl: '/',
                                redirect: true,
                            })
                        }
                        type="button"
                        className="gap-2 h-12 p-2 flex-1">
                        <img
                            className="w-6 h-6"
                            src="https://github.githubassets.com/favicons/favicon.svg"
                            alt="github"
                        />
                        GitHub
                    </Button>

                    {/* Google */}
                    <Button
                        variant="secondary"
                        onClick={() =>
                            signIn('google', {
                                callbackUrl: '/',
                                redirect: true,
                            })
                        }
                        type="button"
                        className="gap-2 h-12 p-2 flex-1">
                        <img
                            className="w-6 h-6"
                            src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
                            alt="google"
                        />
                        Google
                    </Button>
                </div>
                <Button variant="outline" onClick={onSwitchType} type="button" className="h-12">
                    {type !== 'login' ? 'Увійти' : 'Реєстрація'}
                </Button>
            </DialogContent>
        </Dialog>
);
};