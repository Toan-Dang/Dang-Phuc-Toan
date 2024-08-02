import { TABLE_ACCOUNT, dynamoClient } from "../config/dynamodb";
import { createAcountDTO } from "../dto/createAccountDto.dto";
import { User } from "../interfaces/user";
export async function createNewAccount(data: any) {
  const user = createAcountDTO(data);
  const params = {
    TableName: TABLE_ACCOUNT,
    Item: user,
  };
  const characters = await dynamoClient.put(params).promise();
  return characters;
}

export async function findAccountByEmail(email: string) {
  const params = {
    TableName: TABLE_ACCOUNT,
    FilterExpression: "#email = :email",
    ExpressionAttributeNames: {
      "#email": "email",
    },
    ExpressionAttributeValues: {
      ":email": email,
    },
  };

  try {
    const data = await dynamoClient.scan(params).promise();
    if (data.Items && data.Items.length > 0) {
      const user: User = data.Items[0] as User;
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting user from DynamoDB:", error);
    throw error;
  }
}
