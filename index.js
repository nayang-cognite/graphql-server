import { ApolloServer, makeExecutableSchema, makeRemoteExecutableSchema } from 'apollo-server';
import neo4j from 'neo4j-driver'
import { makeAugmentedSchema } from 'neo4j-graphql-js';

const typeDefs = `
type Book {
   id: ID! @id
   title: String!
   author: Author @relation(name: "IS_WRITTEN_BY", direction: IN)
 }

 type Author {
   id: ID! @id 
   name: String!
   book: Book @relation(name: "WRITE", direction: IN)
 }
`;

const schema = makeAugmentedSchema({typeDefs: typeDefs})


const driver = neo4j.driver(
   'bolt://localhost:7687',
   neo4j.auth.basic('neo4j', 'test')
 );

const server = new ApolloServer({ schema, context: {driver} });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

