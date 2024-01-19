import type { ActionFunction } from "@remix-run/node";
import { Form, useActionData, useSubmit } from "@remix-run/react";
import { Button } from "@shopify/polaris";
import React from "react";
import { MONTHLY_PLAN, authenticate } from "~/shopify.server";

type Props = {};

export const action: ActionFunction =async ({ request }) => {
    console.log('hitt')
   const { billing } = await authenticate.admin(request)

   await billing.require({
    plans: [MONTHLY_PLAN],
    isTest: true,
    onFailure: async () => billing.request({
        plan: MONTHLY_PLAN,
        isTest: true
    })
   })

   return null
}


const SubscriptionBtn = (props: Props) => {

    const submit = useSubmit();
    const actionData = useActionData<typeof action>()
    console.log(actionData, 'actionData')
    const startSub = () => submit({}, { replace: true, method: 'POST'})
    
  return (
    <Form onSubmit={startSub} method="post" action="/app/subscriptionBtn">
     <Button submit onClick={startSub}>StartSubscription</Button>
   </Form>);
};

export default SubscriptionBtn;
