import { DeepPartial } from 'ts-essentials';
import { GraphQLResolveInfo } from 'graphql';
import { ApolloContext } from '../server/apollo';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  user: User;
  token: Scalars['String'];
};

export type CreateMissionInput = {
  toId: Scalars['ID'];
  kind: MissionKind;
  initialResources: CreateResourceInput;
};

export type CreateResourceInput = {
  dwellers: Scalars['Int'];
  iron: Scalars['Int'];
};

export type Facilities = {
  __typename?: 'Facilities';
  id: Scalars['ID'];
  ironMine: Scalars['Int'];
};

export enum FacilityKind {
  IronMine = 'ironMine',
}

export type GameState = {
  __typename?: 'GameState';
  id: Scalars['Int'];
  ticks: Scalars['Int'];
  resources: Array<Resources>;
  vaults: Array<Vault>;
  facilities: Array<Facilities>;
  missions: Array<Mission>;
};

export type LoginInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type Mission = {
  __typename?: 'Mission';
  id: Scalars['ID'];
  kind: MissionKind;
  from: Vault;
  to: Vault;
  resources: Maybe<Resources>;
  createdAtTick: Scalars['Int'];
  arrivalTick: Scalars['Int'];
  comebackTick: Scalars['Int'];
};

export enum MissionKind {
  Attack = 'attack',
}

export type Mutation = {
  __typename?: 'Mutation';
  login: AuthPayload;
  signup: AuthPayload;
  resetGameState: GameState;
  upgradeMyFacilityLevel: Facilities;
  createMission: Mission;
};

export type MutationLoginArgs = {
  data: LoginInput;
};

export type MutationSignupArgs = {
  data: SignupInput;
};

export type MutationUpgradeMyFacilityLevelArgs = {
  data: UpgradeMyFacilityLevelInput;
};

export type MutationCreateMissionArgs = {
  data: CreateMissionInput;
};

export type Query = {
  __typename?: 'Query';
  gameState: GameState;
  my: User;
  vaults: Array<Vault>;
};

export type Resources = {
  __typename?: 'Resources';
  dwellers: Scalars['Int'];
  iron: Scalars['Int'];
};

export type SignupInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type UpgradeMyFacilityLevelInput = {
  facilityKind: FacilityKind;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
  vault: Vault;
};

export type Vault = {
  __typename?: 'Vault';
  id: Scalars['ID'];
  x: Scalars['Int'];
  y: Scalars['Int'];
  missions: Maybe<Array<Maybe<Mission>>>;
  resources: Maybe<Resources>;
  facilities: Maybe<Facilities>;
  user: Maybe<User>;
};

export type ResolverTypeWrapper<T> = Promise<DeepPartial<T>> | DeepPartial<T>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type Resolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  GameState: ResolverTypeWrapper<GameState>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Resources: ResolverTypeWrapper<Resources>;
  Vault: ResolverTypeWrapper<Vault>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Mission: ResolverTypeWrapper<Mission>;
  MissionKind: MissionKind;
  Facilities: ResolverTypeWrapper<Facilities>;
  User: ResolverTypeWrapper<User>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Mutation: ResolverTypeWrapper<{}>;
  LoginInput: LoginInput;
  AuthPayload: ResolverTypeWrapper<AuthPayload>;
  SignupInput: SignupInput;
  UpgradeMyFacilityLevelInput: UpgradeMyFacilityLevelInput;
  FacilityKind: FacilityKind;
  CreateMissionInput: CreateMissionInput;
  CreateResourceInput: CreateResourceInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  GameState: GameState;
  Int: Scalars['Int'];
  Resources: Resources;
  Vault: Vault;
  ID: Scalars['ID'];
  Mission: Mission;
  MissionKind: MissionKind;
  Facilities: Facilities;
  User: User;
  String: Scalars['String'];
  Mutation: {};
  LoginInput: LoginInput;
  AuthPayload: AuthPayload;
  SignupInput: SignupInput;
  UpgradeMyFacilityLevelInput: UpgradeMyFacilityLevelInput;
  FacilityKind: FacilityKind;
  CreateMissionInput: CreateMissionInput;
  CreateResourceInput: CreateResourceInput;
  Boolean: Scalars['Boolean'];
};

export type AuthPayloadResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']
> = {
  user: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  token: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type FacilitiesResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['Facilities'] = ResolversParentTypes['Facilities']
> = {
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  ironMine: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type GameStateResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['GameState'] = ResolversParentTypes['GameState']
> = {
  id: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  ticks: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  resources: Resolver<
    Array<ResolversTypes['Resources']>,
    ParentType,
    ContextType
  >;
  vaults: Resolver<Array<ResolversTypes['Vault']>, ParentType, ContextType>;
  facilities: Resolver<
    Array<ResolversTypes['Facilities']>,
    ParentType,
    ContextType
  >;
  missions: Resolver<Array<ResolversTypes['Mission']>, ParentType, ContextType>;
};

export type MissionResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['Mission'] = ResolversParentTypes['Mission']
> = {
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  kind: Resolver<ResolversTypes['MissionKind'], ParentType, ContextType>;
  from: Resolver<ResolversTypes['Vault'], ParentType, ContextType>;
  to: Resolver<ResolversTypes['Vault'], ParentType, ContextType>;
  resources: Resolver<
    Maybe<ResolversTypes['Resources']>,
    ParentType,
    ContextType
  >;
  createdAtTick: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  arrivalTick: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  comebackTick: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  login: Resolver<
    ResolversTypes['AuthPayload'],
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, 'data'>
  >;
  signup: Resolver<
    ResolversTypes['AuthPayload'],
    ParentType,
    ContextType,
    RequireFields<MutationSignupArgs, 'data'>
  >;
  resetGameState: Resolver<
    ResolversTypes['GameState'],
    ParentType,
    ContextType
  >;
  upgradeMyFacilityLevel: Resolver<
    ResolversTypes['Facilities'],
    ParentType,
    ContextType,
    RequireFields<MutationUpgradeMyFacilityLevelArgs, 'data'>
  >;
  createMission: Resolver<
    ResolversTypes['Mission'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateMissionArgs, 'data'>
  >;
};

export type QueryResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  gameState: Resolver<ResolversTypes['GameState'], ParentType, ContextType>;
  my: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  vaults: Resolver<Array<ResolversTypes['Vault']>, ParentType, ContextType>;
};

export type ResourcesResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['Resources'] = ResolversParentTypes['Resources']
> = {
  dwellers: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  iron: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  username: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  vault: Resolver<ResolversTypes['Vault'], ParentType, ContextType>;
};

export type VaultResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['Vault'] = ResolversParentTypes['Vault']
> = {
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  x: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  y: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  missions: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Mission']>>>,
    ParentType,
    ContextType
  >;
  resources: Resolver<
    Maybe<ResolversTypes['Resources']>,
    ParentType,
    ContextType
  >;
  facilities: Resolver<
    Maybe<ResolversTypes['Facilities']>,
    ParentType,
    ContextType
  >;
  user: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type Resolvers<ContextType = ApolloContext> = {
  AuthPayload: AuthPayloadResolvers<ContextType>;
  Facilities: FacilitiesResolvers<ContextType>;
  GameState: GameStateResolvers<ContextType>;
  Mission: MissionResolvers<ContextType>;
  Mutation: MutationResolvers<ContextType>;
  Query: QueryResolvers<ContextType>;
  Resources: ResourcesResolvers<ContextType>;
  User: UserResolvers<ContextType>;
  Vault: VaultResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = ApolloContext> = Resolvers<ContextType>;
export type SignupMutationVariables = {
  data: SignupInput;
};

export type SignupMutation = { __typename?: 'Mutation' } & {
  signup: { __typename?: 'AuthPayload' } & Pick<AuthPayload, 'token'> & {
      user: { __typename?: 'User' } & Pick<User, 'id'>;
    };
};
