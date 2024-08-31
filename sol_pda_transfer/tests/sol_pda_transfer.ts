import * as anchor from "@coral-xyz/anchor";
import { Program, web3 } from "@coral-xyz/anchor";
import { SolPdaTransfer } from "../target/types/sol_pda_transfer";

describe("sol_pda_transfer", () => {
  // Set up the provider
  anchor.setProvider(anchor.AnchorProvider.env());

  // Create a new keypair for the user
  const userKeypair = web3.Keypair.generate();
  const USER_PUBLIC_KEY = userKeypair.publicKey;

  // Load the program
  const program = anchor.workspace.SolPdaTransfer as Program<SolPdaTransfer>;

  it("Creates and transfers SOL to PDA", async () => {
    // Define the seed
    const seed = "seed";

    // Derive PDA address
    const [pda, _bump] = web3.PublicKey.findProgramAddressSync(
      [Buffer.from(seed)],
      program.programId
    );

    // Create airdrop and initialize accounts
    await anchor.getProvider().connection.confirmTransaction(
      await anchor.getProvider().connection.requestAirdrop(USER_PUBLIC_KEY, anchor.web3.LAMPORTS_PER_SOL)
    );

    const tx = await program.methods.createAndTransfer(seed).accounts({
      user: USER_PUBLIC_KEY,
      pdaAccount: pda,
      systemProgram: anchor.web3.SystemProgram.programId,
    }).rpc();

    console.log("Transaction signature for createAndTransfer:", tx);
  });

  it("Transfers SOL from PDA to user", async () => {
    // Define the seed
    const seed = "seed";

    // Derive PDA address
    const [pda, _bump] = web3.PublicKey.findProgramAddressSync(
      [Buffer.from(seed)],
      program.programId
    );

    // Create airdrop for PDA account
    await anchor.getProvider().connection.confirmTransaction(
      await anchor.getProvider().connection.requestAirdrop(pda, anchor.web3.LAMPORTS_PER_SOL)
    );

    const tx = await program.methods.transferToUser(seed).accounts({
      user: USER_PUBLIC_KEY,
      pdaAccount: pda,
      systemProgram: anchor.web3.SystemProgram.programId,
    }).rpc();

    console.log("Transaction signature for transferToUser:", tx);
  });
});
