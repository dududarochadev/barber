import { useCallback, useRef, useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, CircularProgress, Divider, Typography } from '@mui/material';
import { useAuthContext } from '../../contexts';

import * as Yup from 'yup';
import { VTextField } from '../../forms';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { IUsuario } from '../../services/api/auth/AuthService';
import getValidationErrors from '../../helpers/getValidationErrors';
import { useMutation } from '@tanstack/react-query';

interface IFormData {
  username?: string,
  email: string,
  telefone?: number,
  password: string,
  confirmPassword: string
}

const loginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(5),
});

const createSchema: Yup.Schema<IFormData> = Yup.object().shape({
  username: Yup.string().required().min(5),
  email: Yup.string().email().required(),
  telefone: Yup.number(),
  password: Yup.string().required().min(5),
  confirmPassword: Yup.string().required().min(5),
});

interface IProps {
  children: React.ReactNode;
}

export const Login: React.FC<IProps> = ({ children }) => {
  const formRef = useRef<FormHandles>(null);

  const { isAuthenticated, login, create } = useAuthContext();
  const [isCadastro, setIsCadastro] = useState(false);

  const { mutate: mutateLogin, isLoading: isLoadingLogin } = useMutation(
    (payload: IUsuario) => login(payload)
  );

  const { mutate: mutateCadastro, isLoading: isLoadingCadastro } = useMutation(
    (payload: IUsuario) => create(payload)
  );

  const handleContinue = useCallback(() => {
    formRef.current?.submitForm();
  }, []);

  const handleSubmit = useCallback(
    async (data: IFormData) => {
      try {
        formRef.current?.setErrors({});
        console.log(data);
        if (isCadastro) {
          await createSchema.validate(data, { abortEarly: false });
          console.log('mutate is cadastro');

          // mutateCadastro({
          //   username: data.email,
          //   email: data.email,
          //   telefone: data.telefone,
          //   password: data.password,
          // });
        } else {
          await loginSchema.validate({ email: data.email, password: data.password }, { abortEarly: false });

          console.log('mutate login');
          // mutateLogin({
          //   username: data.email,
          //   password: data.password
          // });
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err as Yup.ValidationError);
          formRef.current?.setErrors(errors);
        }
      }
    }, [isCadastro, mutateCadastro, mutateLogin]);

  if (isAuthenticated) return (
    <>{children}</>
  );

  return (
    !isCadastro ? (
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center'>
          <Card>
            <Box padding={2}>
              <CardContent>
                <Box display='flex' flexDirection='column' gap={2} width={300}>
                  <Typography variant='h5' align='center'>
                    Faça o login
                  </Typography>

                  <Divider variant='middle' />

                  <VTextField
                    fullWidth
                    label='E-mail'
                    name='email'
                    type='email'
                    disabled={isLoadingLogin}
                  />

                  <VTextField
                    fullWidth
                    label='Senha'
                    name='password'
                    type='password'
                    disabled={isLoadingLogin}
                  />

                  <Box display='flex' justifyContent='left'>
                    <Button variant='text' onClick={() => undefined} style={{ fontSize: 12 }}>Esqueceu sua senha?</Button>
                  </Box>
                </Box>
              </CardContent>


              <CardActions
                sx={{ padding: 0 }}
              >
                <Box display='flex' flexDirection='column' gap={2} width={300} paddingX={2}>

                  <Button
                    variant='contained'
                    disabled={isLoadingLogin}
                    onClick={handleContinue}
                    endIcon={isLoadingLogin ? <CircularProgress variant='indeterminate' color='inherit' size={20} /> : undefined}
                  >
                    Entrar
                  </Button>

                  <Divider variant='middle' />

                  <Box display='flex' justifyContent='center' alignItems='center' gap={2} >
                    <Typography fontSize={14}>Não possui uma conta?</Typography>

                    <Button
                      variant='text'
                      type='submit'
                      size='small'
                      onClick={() => setIsCadastro(true)}>
                      Cadastre-se</Button>
                  </Box>
                </Box>
              </CardActions>
            </Box>
          </Card>
        </Box>
      </Form>
    ) : (
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center'>
          <Card>
            <Box padding={2}>
              <CardContent>
                <Box display='flex' flexDirection='column' gap={2} width={300}>
                  <Typography variant='h5' align='center'>
                    Faça o seu cadastro
                  </Typography>

                  <Divider variant='middle' />

                  <VTextField
                    fullWidth
                    label='Usuário'
                    name='username'
                    disabled={isLoadingCadastro}
                  />

                  <VTextField
                    fullWidth
                    label='E-mail'
                    name='email'
                    type='email'
                    disabled={isLoadingCadastro}
                  />

                  <VTextField
                    fullWidth
                    label='Telefone'
                    name='telefone'
                    type='tel'
                    disabled={isLoadingCadastro}
                  />

                  <VTextField
                    fullWidth
                    label='Senha'
                    name='password'
                    type='password'
                    disabled={isLoadingCadastro}
                  />

                  <VTextField
                    fullWidth
                    label='Confrme sua senha'
                    name='confirmPassword'
                    type='password'
                    disabled={isLoadingCadastro}
                  />

                  <Box display='flex' justifyContent='left'>
                    <Button variant='text' style={{ fontSize: 12 }}>Esqueceu sua senha?</Button>
                  </Box>
                </Box>
              </CardContent>


              <CardActions
                sx={{ padding: 0 }}
              >
                <Box display='flex' flexDirection='column' gap={2} width={300} paddingX={2}>

                  <Button
                    variant='contained'
                    disabled={isLoadingCadastro}
                    onClick={handleContinue}
                    endIcon={isLoadingCadastro ? <CircularProgress variant='indeterminate' color='inherit' size={20} /> : undefined}
                  >
                    Cadastrar
                  </Button>

                  <Divider variant='middle' />

                  <Box display='flex' justifyContent='center' alignItems='center' gap={2} >
                    <Typography fontSize={14}>Já possui uma conta?</Typography>

                    <Button
                      variant='text'
                      size='small'
                      onClick={() => setIsCadastro(!isCadastro)}>
                      Login</Button>
                  </Box>
                </Box>
              </CardActions>
            </Box>
          </Card>
        </Box>
      </Form>
    )
  );
};