"use client";
import React, { useEffect, useState } from "react";
import { useSigner } from "wagmi";
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";

function Notifications() {
  const { data: signer, isError, isLoading } = useSigner();
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    async function initialize() {
      if (signer) {
        console.log(signer);
        const userAlice = await PushAPI.initialize(signer, { env: CONSTANTS.ENV.STAGING });

        const inboxNotifications = await userAlice.notification.list("INBOX");
        console.log(inboxNotifications);

        // List spam notifications
        const spamNotifications = await userAlice.notification.list("SPAM");
        console.log(spamNotifications);

        const pushChannelAdress = "0x15413cd3Bb0d8BCB88a70aE3679f68Dd7E5194Fb";

        // Subscribe to push channel
        await userAlice.notification.subscribe(
          `eip155:421613:${pushChannelAdress}`, // channel address in CAIP format
        );
        setNotifications(inboxNotifications);
      }
    }
    initialize();
  }, [signer]);
  return (
    <div>
      <h1>Notifications</h1>
      <div>
        {notifications != "" ? (
          notifications
            .filter(notification => notification.app === "DeTest")
            .map((notification, index) => (
              <div key={index}>
                <p>{notification.notification.title}</p>
                <p>{notification.message}</p>
              </div>
            ))
        ) : (
          <p>No notifications</p>
        )}
      </div>
    </div>
  );
}

export default Notifications;
