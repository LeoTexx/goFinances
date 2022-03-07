import React from "react";
import { View, Text, TextInput, Button } from "react-native";

export function Profile() {
  return (
    <View>
      <Text testID="text-title">Perfil</Text>
      <TextInput
        testID="input-name"
        placeholder="Nome"
        value="Leonardo"
        autoCorrect={false}
      />
      <TextInput
        testID="input-surname"
        placeholder="sobrenmome"
        value="Teixeira"
      />
      <Button title="Salvar" onPress={() => {}} />
    </View>
  );
}
