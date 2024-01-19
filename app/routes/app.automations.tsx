import type { ActionFunction } from "@remix-run/node";
import { Form, json, useActionData, useLoaderData, useSubmit } from "@remix-run/react";
import { Button, Layout, Page, TextField } from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import VercelInviteUserEmail from "~/emails/custom";
import {MONTHLY_PLAN, authenticate } from "~/shopify.server";

type Props = {};

// send email when user is created

// 1 setup webhook
// 2 create automation



export const action: ActionFunction = async ({ request }) => {

  //TRIGGER WEBHOOOK

  const {admin, session } = await authenticate.admin(request)
  // shop and access token
  //  const {shop, accessToken } = session
  //  console.log(shop, accessToken)
  // const webhook = new admin.rest.resources.Webhook({session: session})

  // if(webhook){
  //   console.log(webhook, '-------- webhook hit create user---------')

  //   webhook.address = "pubsub://projectName:topicName"
  //   webhook.topic = "customers/create"
  //   webhook.format = "json"

  //   console.log('-------- webhook successfully created---------')
  //   await webhook.save({update: true })

  // }

  //return null

  const res = await admin.rest.resources.Webhook.delete({
    session: session,
    id: 1266162303130
  });

  if (res){
    console.log('deleted successfully')
    return json({res}, 200)

  }
  return null
}


export const loader = async ({ request}: any) => {
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





const AtomationsPage = (props: Props) => {


 const data: any = useLoaderData()
 console.log(data)


  const [value, setValue] = useState('default');

  const handleChangeText = useCallback((newValue: string) => setValue(newValue), [])

  const submit = useSubmit();
  const actionData = useActionData<typeof action>()
 
  console.log(actionData, 'CreateCampaingForm')
 
  const sendAutomation = () => submit({}, { replace: true, method: 'POST'})


  return (<Page>
                    <Form onSubmit={sendAutomation} method="post" action="/app/automations">
                      <h1>CREATE AUTOMATION (AUTOMATIC EMAIL SEND AFTER USER SIGN UP)</h1>
                    <Layout>
                        <Layout.Section>
                            <TextField
                              label="Automation Name"
                               value={value}
                               onChange={handleChangeText}
                               autoComplete="off"
                              />
                             <TextField
                              label="To"
                               value={value}
                               onChange={handleChangeText}
                               autoComplete="off"
                              />
                              <TextField
                              label="Corporation"
                               value={value}
                               onChange={handleChangeText}
                               autoComplete="off"
                              />
                            <TextField
                              label="From"
                               value={value}
                               onChange={handleChangeText}
                               autoComplete="off"
                              />
                            <TextField
                              label="Email Subject"
                               value={value}
                               onChange={handleChangeText}
                               autoComplete="off"
                              />
                            <TextField
                              label="Content"
                               value={value}
                               onChange={handleChangeText}
                               autoComplete="off"
                              />
                              <Button submit >send</Button>
                        </Layout.Section>
                        <Layout.Section>
                        <VercelInviteUserEmail/>
                        </Layout.Section>
                    </Layout>
                </Form>

  </Page>);
};

export default AtomationsPage;
