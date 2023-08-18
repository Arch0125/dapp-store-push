import { PushAPIModule } from "@dapp-sdk/messaging-push";
import { useState } from "react";
import { useWalletClient } from "wagmi";

const FetchChatBetweenUsersButton = () => {
  const [receiverAddress, setReceiverAddress] = useState("");
  const [messageContent, setMessageContent] = useState("");

  const pushAPI = new PushAPIModule({ env: "staging" });

  async function getUser(publicAddress: string) {
    const user = await pushAPI.getUser({
      account: publicAddress,
      env: "staging",
    });

    return user;
  }

  async function fetchChatHistory(
    publicAddress: string,
    signer: any,
    publicAddress2: string
  ) {
    // Fetch user
    const user = await getUser(publicAddress);

    // Decrypt PGP Key
    const pgpDecryptedPvtKey = await pushAPI.getPgpPrivateKey({
      encryptedPGPPrivateKey: user.encryptedPrivateKey,
      signer: walletClient,
    });

    const conversationHash = await pushAPI.conversationHash({
      account: publicAddress,
      conversationId: publicAddress2,
      env: "staging",
    });

    const conversationHistory = await pushAPI.chatHistoryBetweenTwoUsers({
      account: publicAddress,
      threadhash: conversationHash.threadHash,
      env: "staging",
      toDecrypt: true,
      pgpPrivateKey: pgpDecryptedPvtKey,
    });

    console.log("Conversation History :", conversationHistory);
  }

  const { data: walletClient, isError, isLoading } = useWalletClient();
  const addr = walletClient?.account?.address;

  return (
    <div className="flex flex-col w-fit h-fit justify-center mt-5">
      <p className="text-black text-xl font-bold p-4">Fetch Chat History using SDK</p>

      <input
        type="text"
        placeholder="Receiver Address"
        onChange={(e) => setReceiverAddress(e.target.value)}
        className="border-[1px] rounded-xl text-black p-2 m-2"
      />
      <button
      className="bg-blue-500 px-4 py-2 text-white font-bold rounded-xl"
        onClick={() => fetchChatHistory(addr, walletClient, receiverAddress)}
      >
        Fetch Chat History
      </button>
    </div>
  );
};

export default FetchChatBetweenUsersButton;
