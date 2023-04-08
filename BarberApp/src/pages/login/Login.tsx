import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Box, Button, Card, CardActions, CardContent, CircularProgress, Divider, Icon, IconButton, InputAdornment, Tooltip, Typography } from '@mui/material';

import * as Yup from 'yup';
import { VTextField } from '../../shared/forms';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../shared/helpers/getValidationErrors';
import { Visibility } from '@mui/icons-material';
import { gapi } from 'gapi-script';
import { ICadastroUsuario, ILogin, servicoDeUsuario } from '../../shared/services/api/auth/servicoDeUsuario';
import { useNavigate } from 'react-router-dom';

interface IFormData {
  nomeCompleto: string,
  email: string,
  cpf?: string,
  telefone?: number,
  senha: string,
  confirmacaoDeSenha: string
}

const loginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  senha: Yup.string().required().min(5),
});

const createSchema: Yup.Schema<IFormData> = Yup.object().shape({
  nomeCompleto: Yup.string().required().min(5),
  email: Yup.string().email().required(),
  cpf: Yup.string(),
  senha: Yup.string().required().min(5).matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
    'A senha precisa conter pelo menos 8 caracteres, 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial'),
  confirmacaoDeSenha: Yup.string().required().min(5).oneOf([Yup.ref('senha')], 'A confirmação de senha deve ser igual a senha'),
});

const textTooltipPassword =
  `A senha deve conter ao menos:

 - 8 caracteres
 - 1 caractere especial
 - 1 caractere maiúsculo
 - 1 caractere minúsculo
`;

export const Login: React.FC = () => {
  const [isCadastro, setIsCadastro] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [isLoadingCadastro, setIsLoadingCadastro] = useState(false);
  const [mensagemErro, setMensagemErro] = useState(false);

  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function start() {
      gapi.auth2.init({
        client_id: '689846891590-gd4uvtfgm641dv0q7drfurgng1qi36ks.apps.googleusercontent.com'
      });
    }

    gapi.load('client:auth2', start);
  });

  const handleLogin = useCallback(async (usuario: ILogin) => {
    try {
      await servicoDeUsuario.login(usuario);

      navigate('/pagina-inicial');
    }
    catch (error: any) {
      setMensagemErro(error.message);
    }

  }, []);

  const handleCadastro = useCallback(async (usuario: ICadastroUsuario) => {
    try {
      await servicoDeUsuario.cadastrar(usuario);

      navigate('/pagina-inicial');
    }
    catch (error) {
      console.log('erroCadastro');
    }
  }, []);

  const handleContinue = useCallback(() => {
    formRef.current?.submitForm();
  }, []);

  const handleClickCadastroLogin = useCallback(() => {
    formRef.current?.reset();
    formRef.current?.setErrors({});
    setIsCadastro(!isCadastro);
  }, [isCadastro]);

  const handleSubmit = useCallback(
    async (data: IFormData) => {
      try {
        formRef.current?.setErrors({});

        if (isCadastro) {
          await createSchema.validate(data, { abortEarly: false });

          setIsLoadingCadastro(true);

          handleCadastro({
            nomeCompleto: data.nomeCompleto,
            email: data.email,
            cpf: data.cpf,
            telefone: data.telefone ?? 0,
            senha: data.senha,
            confirmacaoDeSenha: data.confirmacaoDeSenha
          }).then(() => {
            setIsLoadingCadastro(false);
          });
        } else {
          await loginSchema.validate({ email: data.email, senha: data.senha }, { abortEarly: false });

          setIsLoadingLogin(true);

          handleLogin({
            email: data.email,
            senha: data.senha
          }).then(() => {
            setIsLoadingLogin(false);
          });
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err as Yup.ValidationError);
          formRef.current?.setErrors(errors);
        }
      }
    }, [isCadastro]);

  // const responseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
  //   console.log(response);
  //   response.tokenId && localStorage.setItem('access_token', response.tokenId);
  //   localStorage.setItem('nome_completo', response.profileObj.name);
  // };

  return !isCadastro ? (
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

                {mensagemErro && <Alert severity='error'>{mensagemErro}</Alert>}

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
                  name='senha'
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
                  type='submit'
                >
                  Entrar
                </Button>

                <Box display='flex' justifyContent='center'>
                  <Typography>Ou</Typography>
                </Box>

                {/* <GoogleLogin
                  clientId='689846891590-gd4uvtfgm641dv0q7drfurgng1qi36ks.apps.googleusercontent.com'
                  buttonText='Continuar com google'
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                /> */}

                <Divider variant='middle' />

                <Box display='flex' justifyContent='center' alignItems='center' gap={2} >
                  <Typography fontSize={14}>Não possui uma conta?</Typography>

                  <Button
                    variant='text'
                    size='small'
                    onClick={handleClickCadastroLogin}>
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
                  label='Nome completo'
                  name='nomeCompleto'
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
                  label='Cpf'
                  name='cpf'
                  disabled={isLoadingCadastro}
                />

                <VTextField
                  fullWidth
                  label='Telefone'
                  name='telefone'
                  type='number'
                  disabled={isLoadingCadastro}
                />

                <VTextField
                  fullWidth
                  label='Senha'
                  name='senha'
                  type={mostrarSenha ? 'text' : 'password'}
                  disabled={isLoadingCadastro}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton onClick={() => setMostrarSenha(!mostrarSenha)}>
                          <Visibility />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />

                <VTextField
                  fullWidth
                  label='Confrme sua senha'
                  name='confirmacaoDeSenha'
                  type={mostrarSenha ? 'text' : 'password'}
                  disabled={isLoadingCadastro}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton onClick={() => setMostrarSenha(!mostrarSenha)}>
                          <Visibility />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />

                <Box display='flex' alignItems='center'>
                  <Typography fontSize={12}>Regras de senha</Typography>
                  <Tooltip title={<span style={{ whiteSpace: 'pre-line' }}>{textTooltipPassword}</span>} placement='top' arrow>
                    <IconButton><Icon sx={{ fontSize: 14 }}>help_outline</Icon></IconButton>
                  </Tooltip>
                </Box>

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
                  type='submit'
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
                    onClick={handleClickCadastroLogin}>
                    Login</Button>
                </Box>
              </Box>
            </CardActions>
          </Box>
        </Card>
      </Box>
    </Form>
  );
};