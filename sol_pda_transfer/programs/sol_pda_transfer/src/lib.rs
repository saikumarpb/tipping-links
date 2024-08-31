use anchor_lang::prelude::*;

declare_id!("F2uxX4M9xTe3B8LQRYrFqjPDfazUKvNMFEvgHWakWCqo");

#[program]
pub mod sol_pda_transfer {
    use super::*;

    pub fn create_and_transfer(ctx: Context<CreateAndTransfer>, seed: String) -> Result<()> {
        // Derive the PDA using the seed
        let (pda, _bump) = Pubkey::find_program_address(&[seed.as_bytes()], ctx.program_id);

        // Ensure the PDA account is correctly initialized and owned by the program
        if ctx.accounts.pda_account.key() != pda {
            return Err(ProgramError::InvalidAccountData.into());
        }

        // Transfer SOL to PDA
        let amount = ctx.accounts.user.to_account_info().lamports();
        **ctx
            .accounts
            .user
            .to_account_info()
            .try_borrow_mut_lamports()? -= amount;
        **ctx
            .accounts
            .pda_account
            .to_account_info()
            .try_borrow_mut_lamports()? += amount;

        Ok(())
    }

    pub fn transfer_to_user(ctx: Context<TransferToUser>, seed: String) -> Result<()> {
        // Derive the PDA again
        let (pda, _bump) = Pubkey::find_program_address(&[seed.as_bytes()], ctx.program_id);

        if ctx.accounts.pda_account.key() != pda {
            return Err(ProgramError::InvalidAccountData.into());
        }
        // Transfer SOL from PDA to user
        let amount = ctx.accounts.pda_account.to_account_info().lamports();
        **ctx
            .accounts
            .pda_account
            .to_account_info()
            .try_borrow_mut_lamports()? -= amount;
        **ctx
            .accounts
            .user
            .to_account_info()
            .try_borrow_mut_lamports()? += amount;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateAndTransfer<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    /// CHECK: This is a PDA account. The seeds and bump are verified in the constraints.
    #[account(init_if_needed, payer = user, space = 8 + 8, seeds = [b"seed"], bump)]
    pub pda_account: AccountInfo<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct TransferToUser<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    /// CHECK: This is a PDA account that we know is safe because the seeds and bump are validated in the constraints.
    #[account(mut, seeds = [b"seed"], bump)]
    pub pda_account: AccountInfo<'info>,

    pub system_program: Program<'info, System>,
}
