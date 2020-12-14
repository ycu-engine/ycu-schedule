/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateNewsInput = {
  id?: string | null,
  title: string,
  content: string,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type ModelNewsConditionInput = {
  title?: ModelStringInput | null,
  content?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelNewsConditionInput | null > | null,
  or?: Array< ModelNewsConditionInput | null > | null,
  not?: ModelNewsConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type UpdateNewsInput = {
  id: string,
  title?: string | null,
  content?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteNewsInput = {
  id?: string | null,
};

export type ModelNewsFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  content?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelNewsFilterInput | null > | null,
  or?: Array< ModelNewsFilterInput | null > | null,
  not?: ModelNewsFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type CreateNewsMutationVariables = {
  input: CreateNewsInput,
  condition?: ModelNewsConditionInput | null,
};

export type CreateNewsMutation = {
  createNews:  {
    __typename: "News",
    id: string,
    title: string,
    content: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateNewsMutationVariables = {
  input: UpdateNewsInput,
  condition?: ModelNewsConditionInput | null,
};

export type UpdateNewsMutation = {
  updateNews:  {
    __typename: "News",
    id: string,
    title: string,
    content: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteNewsMutationVariables = {
  input: DeleteNewsInput,
  condition?: ModelNewsConditionInput | null,
};

export type DeleteNewsMutation = {
  deleteNews:  {
    __typename: "News",
    id: string,
    title: string,
    content: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetNewsQueryVariables = {
  id: string,
};

export type GetNewsQuery = {
  getNews:  {
    __typename: "News",
    id: string,
    title: string,
    content: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListNewssQueryVariables = {
  filter?: ModelNewsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListNewssQuery = {
  listNewss:  {
    __typename: "ModelNewsConnection",
    items:  Array< {
      __typename: "News",
      id: string,
      title: string,
      content: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateNewsSubscription = {
  onCreateNews:  {
    __typename: "News",
    id: string,
    title: string,
    content: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateNewsSubscription = {
  onUpdateNews:  {
    __typename: "News",
    id: string,
    title: string,
    content: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteNewsSubscription = {
  onDeleteNews:  {
    __typename: "News",
    id: string,
    title: string,
    content: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
