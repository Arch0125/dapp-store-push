import { PushAPIModule } from "@dapp-sdk/messaging-push";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import { useWalletClient } from "wagmi";

const pushAPI = new PushAPIModule({ env: "staging" });

async function createUser(signer: any) {
  try {
    const user = await pushAPI.createUser({
      signer: signer,
    });

    console.log("Push API response for createUser(): ", user);
    return user;
  } catch (e) {
    console.log("Push API response for createUser(): ", e);
  }
}

const CreateUserButton: NextPage = () => {
  const { data: walletClient, isError, isLoading } = useWalletClient();
  const addr = walletClient?.account?.address;

  return (
    <div className="flex flex-col w-fit h-fit justify-center">
      <p className="text-black text-xl font-bold p-4">Create User using SDK</p>
      <button
        className="bg-blue-500 px-4 py-2 text-white font-bold rounded-xl"
        onClick={() => createUser(walletClient)}
      >
        Create User
      </button>
    </div>
  );
};

export default CreateUserButton;
