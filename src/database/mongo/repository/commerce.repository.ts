import connectToDatabase from "@database/mongo";
import CommerceModel from "@database/mongo/models/commerce.model";

connectToDatabase();

export const getCommerceByPk = (pk: string) => {
  return CommerceModel.findOne({
    pk,
    isActive: true,
  });
};

export const getCommerceByUsername = (username: string) => {
  return CommerceModel.findOne({
    username,
    isActive: true,
  });
};
