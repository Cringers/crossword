import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Crossword = {
  __typename?: 'Crossword';
  grid: Array<Point>;
  id: Scalars['String'];
  name: Scalars['String'];
};

export type Point = {
  __typename?: 'Point';
  value: Scalars['String'];
  x: Scalars['Int'];
  y: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  crossword: Crossword;
  test: Test;
};

export type Test = {
  __typename?: 'Test';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type TestQueryVariables = Exact<{ [key: string]: never; }>;


export type TestQuery = { __typename?: 'Query', test: { __typename?: 'Test', name: string } };

export type CrosswordQueryVariables = Exact<{ [key: string]: never; }>;


export type CrosswordQuery = { __typename?: 'Query', crossword: { __typename?: 'Crossword', name: string, grid: Array<{ __typename?: 'Point', x: number, y: number }> } };


export const TestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Test"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"test"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<TestQuery, TestQueryVariables>;
export const CrosswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Crossword"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"crossword"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"grid"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}}]}}]}}]}}]} as unknown as DocumentNode<CrosswordQuery, CrosswordQueryVariables>;