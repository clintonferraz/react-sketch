import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { mask, unMask } from 'remask'

type FormData = {
    name: string,
    cpf: string,
    email: string,
    phone: string
}

export default function Form() {
    const [phone, setPhone] = useState("");
    const [cpf, setCpf] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        data.phone = unMask(data.phone)
        console.log(data);

    }

    const applyMask = (eventTarget: HTMLInputElement) => {
        switch (eventTarget.id) {
            case 'phone':
                setPhone(mask(unMask(eventTarget.value), ['(99) 9999-9999', '(99) 9 9999-9999']));
                break;
            case 'cpf':
                setCpf(mask(unMask(eventTarget.value), ['999.999.999-99']));
            default:
                break;
        }
    }


    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6 border p-4">
                    <h2 className="mb-3">My form</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row g-3">
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">Nome:</label>
                                <input type="text" className="form-control" id="name" {...register('name', { required: true })} placeholder="Digite o Nome" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="cpf" className="form-label">CPF:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cpf"
                                    placeholder="Digite o CPF"
                                    value={cpf} 
                                    {...register('cpf', { onChange: (event) => applyMask(event.target) })}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="form-label">Email:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    placeholder="Digite o Endereço de email"
                                    {...register('email', {
                                        pattern:
                                        {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    })}
                                />
                                {errors.email && <span>{errors.email.message}</span>}
                            </div>

                            <div className="form-group  mb-3">
                                <label htmlFor="phone" className="form-label">Telefone:</label>
                                <input
                                    className="form-control"
                                    id="phone"
                                    placeholder="(00) 0000-0000"
                                    value={phone}
                                    {...register('phone', { onChange: (event) => applyMask(event.target) })}
                                />
                            </div>

                            <div className="form-group d-flex justify-content-end">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
