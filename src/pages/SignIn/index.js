import React from 'react';
import { View } from 'react-native';
import Background from '~/components/Background';
import Input from '~/components/Input';

// import { Container } from './styles';

export default function SignIn() {
  return (
    <Background>
      <Input
        style={{ marginTop: 30 }}
        icon="call"
        placeholder="Digite seu nome"
      />
    </Background>
  );
}
