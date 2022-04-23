import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Answer = {
  __typename?: 'Answer';
  answer: Scalars['String'];
  clue: Scalars['String'];
  key: Scalars['Int'];
};

export type Answers = {
  __typename?: 'Answers';
  across: Array<Answer>;
  down: Array<Answer>;
};

export type Crossword = {
  __typename?: 'Crossword';
  answers: Answers;
  grid: Grid;
  id: Scalars['String'];
  name: Scalars['String'];
};

export type Grid = {
  __typename?: 'Grid';
  dimension: Scalars['Int'];
  points: Array<Point>;
};

export type Point = {
  __typename?: 'Point';
  across: Scalars['Boolean'];
  first: Scalars['Boolean'];
  hint: Scalars['Int'];
  value: Scalars['String'];
  x: Scalars['Int'];
  y: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  crossword: Crossword;
};

export type CrosswordQueryVariables = Exact<{ [key: string]: never; }>;


export type CrosswordQuery = { __typename?: 'Query', crossword: { __typename?: 'Crossword', name: string, grid: { __typename?: 'Grid', dimension: number, points: Array<{ __typename?: 'Point', x: number, y: number, value: string }> }, answers: { __typename?: 'Answers', across: Array<{ __typename?: 'Answer', key: number, clue: string, answer: string }>, down: Array<{ __typename?: 'Answer', key: number, clue: string, answer: string }> } } };


export const CrosswordDocument = gql`
    query Crossword {
  crossword {
    name
    grid {
      dimension
      points {
        x
        y
        value
      }
    }
    answers {
      across {
        key
        clue
        answer
      }
      down {
        key
        clue
        answer
      }
    }
  }
}
    `;

/**
 * __useCrosswordQuery__
 *
 * To run a query within a React component, call `useCrosswordQuery` and pass it any options that fit your needs.
 * When your component renders, `useCrosswordQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCrosswordQuery({
 *   variables: {
 *   },
 * });
 */
export function useCrosswordQuery(baseOptions?: Apollo.QueryHookOptions<CrosswordQuery, CrosswordQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CrosswordQuery, CrosswordQueryVariables>(CrosswordDocument, options);
      }
export function useCrosswordLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CrosswordQuery, CrosswordQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CrosswordQuery, CrosswordQueryVariables>(CrosswordDocument, options);
        }
export type CrosswordQueryHookResult = ReturnType<typeof useCrosswordQuery>;
export type CrosswordLazyQueryHookResult = ReturnType<typeof useCrosswordLazyQuery>;
export type CrosswordQueryResult = Apollo.QueryResult<CrosswordQuery, CrosswordQueryVariables>;