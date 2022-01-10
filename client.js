// client.js is used to introduce the reader to generating clients from IDLs.
// It is not expected users directly test with this example. For a more
// ergonomic example, see `tests/basic-0.js` in this workspace.

const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3;
const idl = require("./idl.json")
const provider = anchor.Provider.env();
// Configure the local cluster.
anchor.setProvider(provider);

async function main() {
  // #region main
  // Read the generated IDL.
 

  const programId = new anchor.web3.PublicKey("3hDf6fvSXgYKHSDSKvUZriJvUspTqQD5cSG7up61xJxw");
  const baseAccount = anchor.web3.Keypair.generate();
  const splitAdmin = anchor.web3.Keypair.generate();
  const aone = anchor.web3.Keypair.generate();
  const atwo = anchor.web3.Keypair.generate();
  // Generate the program client from IDL.
  const program = new anchor.Program(idl, programId, provider);

  // Execute the RPC.
  let tx = await program.rpc.initialize({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
      authority: baseAccount.publicKey
    },
    signers: [baseAccount]
  });
  console.log("📝 Your transaction signature", tx);
  // #endregion main
  let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log("🤺 Your account ", account);
try{
  let new_split = await program.rpc.newSplit(
    
   [new anchor.BN(60), new anchor.BN(40)],
   [aone.publicKey,atwo.publicKey]
    ,{
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      }
    });
  console.log("📝 Your new split", new_split);
}catch(e){
  console.log("Error 🟥", e);
}
  
  console.log("Done!");
}

console.log("Running client.");
main().then(() => console.log("Success"));
