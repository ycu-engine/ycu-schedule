/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateNews = /* GraphQL */ `
  subscription OnCreateNews {
    onCreateNews {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateNews = /* GraphQL */ `
  subscription OnUpdateNews {
    onUpdateNews {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteNews = /* GraphQL */ `
  subscription OnDeleteNews {
    onDeleteNews {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;
export const onCreateStudentProfile = /* GraphQL */ `
  subscription OnCreateStudentProfile($owner: String!) {
    onCreateStudentProfile(owner: $owner) {
      owner
      weeks
      periods
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateStudentProfile = /* GraphQL */ `
  subscription OnUpdateStudentProfile($owner: String!) {
    onUpdateStudentProfile(owner: $owner) {
      owner
      weeks
      periods
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteStudentProfile = /* GraphQL */ `
  subscription OnDeleteStudentProfile($owner: String!) {
    onDeleteStudentProfile(owner: $owner) {
      owner
      weeks
      periods
      createdAt
      updatedAt
    }
  }
`;
