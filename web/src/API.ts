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

export type CreateProfileInput = {
  owner: string,
  weeks: Array< number | null >,
  periods: Array< number | null >,
};

export type ModelProfileConditionInput = {
  weeks?: ModelIntInput | null,
  periods?: ModelIntInput | null,
  and?: Array< ModelProfileConditionInput | null > | null,
  or?: Array< ModelProfileConditionInput | null > | null,
  not?: ModelProfileConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateProfileInput = {
  owner: string,
  weeks?: Array< number | null > | null,
  periods?: Array< number | null > | null,
};

export type DeleteProfileInput = {
  owner: string,
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

export type ModelProfileFilterInput = {
  owner?: ModelStringInput | null,
  weeks?: ModelIntInput | null,
  periods?: ModelIntInput | null,
  and?: Array< ModelProfileFilterInput | null > | null,
  or?: Array< ModelProfileFilterInput | null > | null,
  not?: ModelProfileFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


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

export type CreateProfileMutationVariables = {
  input: CreateProfileInput,
  condition?: ModelProfileConditionInput | null,
};

export type CreateProfileMutation = {
  createProfile:  {
    __typename: "Profile",
    owner: string,
    weeks: Array< number | null >,
    periods: Array< number | null >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateProfileMutationVariables = {
  input: UpdateProfileInput,
  condition?: ModelProfileConditionInput | null,
};

export type UpdateProfileMutation = {
  updateProfile:  {
    __typename: "Profile",
    owner: string,
    weeks: Array< number | null >,
    periods: Array< number | null >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteProfileMutationVariables = {
  input: DeleteProfileInput,
  condition?: ModelProfileConditionInput | null,
};

export type DeleteProfileMutation = {
  deleteProfile:  {
    __typename: "Profile",
    owner: string,
    weeks: Array< number | null >,
    periods: Array< number | null >,
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

export type GetProfileQueryVariables = {
  owner: string,
};

export type GetProfileQuery = {
  getProfile:  {
    __typename: "Profile",
    owner: string,
    weeks: Array< number | null >,
    periods: Array< number | null >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListProfilesQueryVariables = {
  owner?: string | null,
  filter?: ModelProfileFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListProfilesQuery = {
  listProfiles:  {
    __typename: "ModelProfileConnection",
    items:  Array< {
      __typename: "Profile",
      owner: string,
      weeks: Array< number | null >,
      periods: Array< number | null >,
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

export type OnCreateProfileSubscriptionVariables = {
  owner: string,
};

export type OnCreateProfileSubscription = {
  onCreateProfile:  {
    __typename: "Profile",
    owner: string,
    weeks: Array< number | null >,
    periods: Array< number | null >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateProfileSubscriptionVariables = {
  owner: string,
};

export type OnUpdateProfileSubscription = {
  onUpdateProfile:  {
    __typename: "Profile",
    owner: string,
    weeks: Array< number | null >,
    periods: Array< number | null >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteProfileSubscriptionVariables = {
  owner: string,
};

export type OnDeleteProfileSubscription = {
  onDeleteProfile:  {
    __typename: "Profile",
    owner: string,
    weeks: Array< number | null >,
    periods: Array< number | null >,
    createdAt: string,
    updatedAt: string,
  } | null,
};
