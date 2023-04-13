import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { mask, unMask } from 'remask'

type FormData = {
    name: string,
    cpf: string,
    email: string,
    phone: string,
    dateOfBirth: string;
    time: string;
}

export default function Form() {
    const [formFields, setFormFields] = useState<FormData>({
        name: '',
        cpf: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        time: ''
    });

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();


    const onSubmit: SubmitHandler<FormData> = (data) => {



        //unmask some data field to remove special characters and use just what the user entered
        const modifiedData = {
            ...data,
            phone: unMask(data.phone),
            cpf: unMask(data.cpf),
        };

        //this console.log could be replaced by further form sumbit logic
        console.log(modifiedData);
    };

    //apply input mask to some form inputs, if inputMask is not specified then it should be undefined and the field will not be masked
    const applyMask = (eventTarget: HTMLInputElement, inputMask: string[] | undefined = undefined) => {
        const { id, value } = eventTarget;
        let maskedValue = inputMask ? mask(unMask(value), inputMask) : value;

        //sets the formField state changing only the property modified by the input change
        setFormFields((prevFields) => ({
            ...prevFields,
            [id]: maskedValue,
        }));

    }


    return (
        <div className="container">
            <div className="row justify-content-center mt-5 mb-5">
                <div className="col-md-6 border p-4">

                    <h2 className="mb-3">My form</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row g-3">

                            <div className="form-group">
                                <label htmlFor="name" className="form-label">Nome:</label>
                                <input type="text"
                                    className="form-control"
                                    /* The "id" attribute of the inputs must be equal the property in FormData type */
                                    id="name"
                                    value={formFields.name}
                                    placeholder="Digite o Nome"
                                    {...register('name', { required: true, onChange: (event) => applyMask(event.target) })}
                                />
                                {errors.name && <span>This Field Is Required</span>}
                            </div>


                            <div className="form-group">
                                <label htmlFor="cpf" className="form-label">CPF ou CNPJ:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cpf"
                                    placeholder="Digite o CPF"
                                    value={formFields.cpf}
                                    {...register('cpf', { onChange: (event) => applyMask(event.target, ['999.999.999-99', '99.999.999/9999-99']) })}
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


                            <div className="form-group">
                                <label htmlFor="phone" className="form-label">Telefone:</label>
                                <input
                                    className="form-control"
                                    id="phone"
                                    placeholder="(00) 0000-0000"
                                    value={formFields.phone}
                                    {...register('phone', { onChange: (event) => applyMask(event.target, ['(99) 9999-9999', '(99) 9 9999-9999']) })}
                                />
                            </div>


                            <div className="form-group">
                                <label htmlFor="dateOfBirth" className="form-label">Data de Nascimento:</label>
                                <input
                                    type="date"
                                    min="1990-01-01" max="2019-01-01" //optional min an max values for the date yyyy-mm-dd
                                    className="form-control"
                                    id="dateOfBirth"
                                    value={formFields.dateOfBirth}
                                    {...register('dateOfBirth', { onChange: (event) => applyMask(event.target) })}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="time" className="form-label">DateTime Picker com segundos:</label>
                                <input
                                    type="datetime-local"
                                    //the default value for step is 60, which hides the seconds column
                                    //use step = "1" to work with seconds
                                    min="2018-06-07T00:00" max="2020-06-14T00:00" //optional min an max values for the date/time yyyy-mm-ddThh:MM:ss
                                    step="1"
                                    className="form-control"
                                    id="time"
                                    value={formFields.time}
                                    {...register('time', { onChange: (event) => applyMask(event.target) })}
                                />
                            </div>
                            <div className="row mb-4"></div>


                            <div className="form-group d-flex justify-content-end">

                                <button
                                    type="button"
                                    className="btn btn-secondary me-2"
                                    //using css variables in React:
                                    style={{ "--bs-btn-padding-x": ".5rem", "--bs-btn-font-size": ".75rem" } as React.CSSProperties}
                                >
                                    Cancel
                                </button>

                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </form>


                </div>
            </div>
        </div>
    )
}
