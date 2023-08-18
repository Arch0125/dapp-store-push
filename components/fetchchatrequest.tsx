import { PushAPIModule } from "@dapp-sdk/messaging-push";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import { useWalletClient } from "wagmi";

const pushAPI = new PushAPIModule({ env: "staging" });

async function fetchChatRequest(address: string) {
  try {
    const res = await pushAPI.fetchChatRequest({
      account: address,
      env: "staging",
    });
    console.log("Push API response for fetchChatRequest(): ", res);
  } catch (e) {
    console.log(e);
  }
}

const FetchChatRequestButton: NextPage = () => {
  const { data: walletClient, isError, isLoading } = useWalletClient();
  const addr = walletClient?.account?.address;
  return (
    <div className="flex flex-col w-fit h-fit justify-center mt-5">
      <p className="text-black text-xl font-bold p-4">Fetch Chat Requests using SDK</p>
      <button
        className="bg-blue-500 px-4 py-2 text-white font-bold rounded-xl"
        onClick={() => fetchChatRequest(addr)}
      >
        Fetch Chat Requests
      </button>
    </div>
  );
};

export default FetchChatRequestButton;
