import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../hooks/auth";
import { categories } from "../../utils/categories";
import {
  Container,
  Header,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
  DeleteButton,
} from "./styles";

import { Alert } from "react-native";

export interface TransactionCardProps {
  id: string;
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: Date;
}

interface Props {
  data: TransactionCardProps;
  updateTransactions: () => void;
}

export function TransactionCard({ data, updateTransactions }: Props) {
  const [category] = categories.filter((item) => item.key === data.category);
  const { user } = useAuth();

  async function deleteTransaction() {
    try {
      const dataKey = `@gofinances:transactions_user${user.id}`;
      const localData = await AsyncStorage.getItem(dataKey);
      const currentData = localData ? JSON.parse(localData) : [];

      const filteredData = currentData.filter(
        (transaction: TransactionCardProps) => transaction.id !== data.id
      );

      await AsyncStorage.setItem(dataKey, JSON.stringify([...filteredData]));
      updateTransactions();
    } catch (error) {
      Alert.alert(
        "Error",
        "Erro ao remover o item, tente novamente mais tarde."
      );
    }
  }

  return (
    <Container>
      <Header>
        <Title>{data.name}</Title>
        <DeleteButton onPress={deleteTransaction}>
          <Icon name="trash" />
        </DeleteButton>
      </Header>

      <Amount type={data.type}>
        {data.type === "negative" && "- "}
        {data.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}
