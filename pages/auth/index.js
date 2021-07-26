import Card from "../../components/UI/Card";
import AuthForm from "../../components/AuthForm/AuthForm";
import Head from 'next/head';

const Auth = () => {
  return (
    <>
    <Head>
    <title>Sign In</title>
      <meta 
        name="description"
        description="Create an account to make drinking bets on CHUGGR"
      />
    </Head>
    <Card>
      <AuthForm />
    </Card>
    </>
  );
};

export default Auth;
