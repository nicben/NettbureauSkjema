import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import {useForm} from "react-hook-form";
import {SendButton} from "./components/SendButton";
import {MainContainer} from "./components/MainContainer";
import {Form} from "./components/Form";
import {Input, TextArea} from "./components/Fields";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

/*
 * Har sett på https://www.youtube.com/watch?v=U-iz8b4RExA&ab_channel=MaksimIvanov
 * for inspirasjon. Har tatt utgangspunkt å hans kode for mine components.
 */

const MainForm = () => {
    var missingInput = "Dette feltet er påkrevd!"
    var invalidInput = "Ugyldig!"
    const [statusCode, setStatusCode] = useState(200);
    const {register, handleSubmit, errors} = useForm({
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            areacode: "",
            comment: ""
        },
        mode: "onBlur",
    });


    const onSubmit = (values) => {
        console.log(values)
        alert("Info sendt: " + values.name + ", " + values.email + ", "+ values.phone + ", " + values.areacode + ", " + values.comment)

    }

    const isValidAreacode = async (areacode) => {
        var cors_api_host = 'https://cors-anywhere.herokuapp.com/';
        var api = 'https://webapi.no/api/v1/zipcode/' + areacode;
        axios.get(cors_api_host + api)
            .then(respons => {
                console.log(respons.data.statusCode)
                setStatusCode(respons.data.statusCode)
            })
            .catch(error => {
                setStatusCode(null)
                console.log(error)
            })
        return (statusCode === 200 || "Ugyldig!")
    };


    return (
        <MainContainer>
            <Typography component="h2" variant="h5">
                INFORMASJON
            </Typography>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    ref={register({
                        required: missingInput,
                        minLength: {value: 2, message: invalidInput},
                        maxLength: {value: 50, message: invalidInput}
                    })}
                    label="Navn"
                    id="name"
                    type="text"
                    name="name"
                    error={!!errors.name}
                    helperText={errors?.name?.message}
                />
                <Input
                    ref={register({
                        required: missingInput,
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: invalidInput
                        }
                    })}
                    label="E-post"
                    id="email"
                    type="email"
                    name="email"
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                />
                <Grid container spacing={2}>
                    <Grid item xs={6} >
                            <Input
                                ref={register({
                                    required: missingInput,
                                    pattern: {
                                        value: /^((0047)?|(\+47)?|(47)?)\d{8}$/,
                                        message: invalidInput
                                    }
                                })}
                                label="Telefon"
                                id="phone"
                                name="phone"
                                type="phone"
                                error={!!errors.phone}
                                helperText={errors?.phone?.message}
                            />
                    </Grid>
                    <Grid item xs={6}>
                            <Input
                                ref={register({
                                    required: missingInput,
                                    pattern: {
                                        value: /^\d{4}$/,
                                        message: invalidInput
                                    },
                                    validate: isValidAreacode
                                })}
                                label="Postnummer"
                                id="areacode"
                                name="areacode"
                                error={!!errors.areacode}
                                helperText={errors?.areacode?.message}
                            />

                        </Grid>
                    </Grid>
                    <TextArea
                        ref={register}
                        label="Kommentar"
                        id="comment"
                        name="comment"
                        type="text"
                    />
                    <SendButton>Send inn</SendButton>
            </Form>
        </MainContainer>
    );
};
export default MainForm;
