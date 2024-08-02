import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { TABLE_USER, dynamoClient } from "../config/dynamodb";
import { User } from "../interfaces/user";
import AppError from "../utils/appError";
import { createUserDTO } from "../dto/createUserDto.dto";

export async function getAllPersons() {
  const params = {
    TableName: TABLE_USER,
  };
  const characters = await dynamoClient.scan(params).promise();
  return characters;
}

export async function getPersonById(id: number) {
  console.log(id, "<<<");
  try {
    const params = {
      TableName: TABLE_USER,
      Key: {
        id,
      },
    };
    const characters = await dynamoClient.get(params).promise();
    return characters;
  } catch (error) {
    console.error("Error getPersonById from DynamoDB:", error);
    throw error;
  }
}

export async function addPerson(data: any) {
  if ((await getUsersByQueryString(data.email)).length > 0) {
    throw new AppError("user exist", 400);
  }
  const user = await createUserDTO(data);
  const params = {
    TableName: TABLE_USER,
    Item: user,
  };
  return await dynamoClient.put(params).promise();
}

export async function updatePerson(character: any, id: number) {
  const params = {
    TableName: TABLE_USER,
    Item: character,
    Key: {
      id,
    },
  };
  return await dynamoClient.update(params).promise();
}

export async function deletePerson(id: number) {
  const params = {
    TableName: TABLE_USER,
    Key: {
      id,
    },
  };
  return await dynamoClient.delete(params).promise();
}

export async function getUserWithHighestId(): Promise<User | null> {
  const params: DocumentClient.ScanInput = {
    TableName: TABLE_USER,
  };

  try {
    const data = await dynamoClient.scan(params).promise();
    if (data.Items && data.Items.length > 0) {
      // Sort items based on the ID attribute in descending order
      const sortedItems: any[] = data.Items.sort(
        (a: any, b: any) => b.id - a.id
      );
      // Return the first item (which has the highest ID)
      return sortedItems[0];
    } else {
      // If no items found, return null
      return null;
    }
  } catch (error) {
    console.error("Error getting user with highest ID from DynamoDB:", error);
    throw error;
  }
}

// task 1.2.1
export async function getUsersByQueryString(
  queryString: string
): Promise<User[]> {
  const params: DocumentClient.ScanInput = {
    TableName: TABLE_USER,
    FilterExpression: "contains(#email, :query) OR contains(#username, :query)",
    ExpressionAttributeNames: {
      "#email": "email",
      "#username": "username",
    },
    ExpressionAttributeValues: {
      ":query": queryString,
    },
  };

  try {
    const data = await dynamoClient.scan(params).promise();
    if (data.Items && data.Items.length > 0) {
      // If items are found matching the query, return them
      const users: User[] = data.Items as User[];
      console.log("user", users);
      return users;
    } else {
      // If no items found matching the query, return an empty array
      return [];
    }
  } catch (error) {
    console.error("Error getting users from DynamoDB:", error);
    throw error;
  }
}

// task 1.2.2
export async function updateMultiUsers(records: User[]): Promise<void> {
  try {
    await Promise.all(
      records.map(async (record) => {
        const { id } = record;
        // Check if record exists
        const getParams = {
          TableName: TABLE_USER,
          Key: { id },
        };
        const result = await dynamoClient.get(getParams).promise();

        if (!result.Item) {
          throw new Error(`Record with ID ${id} does not exist.`);
        }

        // Update the record if it exists
        const updateParams = {
          TableName: TABLE_USER,
          Key: { id },
          UpdateExpression: "set username = :u, email = :e, birthdate = :b",
          ExpressionAttributeValues: {
            ":u": record.username,
            ":e": record.email,
            ":b": record.birthdate,
          },
          ReturnValues: "UPDATED_NEW",
        };

        return dynamoClient.update(updateParams).promise();
      })
    );
  } catch (error) {
    console.error("Error updateMultiUsers service ", error);
    throw error;
  }
}
