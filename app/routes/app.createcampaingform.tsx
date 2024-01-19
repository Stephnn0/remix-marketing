import { render } from "@react-email/components";
import type { ActionFunction } from "@remix-run/node";
import { Form, json, useActionData, useSubmit } from "@remix-run/react";
import { Button, Frame, Layout, Modal, Page, TextField } from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import { Resend } from "resend";
import VercelInviteUserEmail from "~/emails/custom";
import { EmialNew } from "~/emails/new";


const resend = new Resend('re_eEd9GiTM_B1ZkF9PchYAXgKEJ7K1XeJiK');

const emailHtml = render(<EmialNew url={''}/>)

type CreateCampaingFormProps = {
    activate: boolean;
    setActivate: React.Dispatch<React.SetStateAction<boolean>>;
  };


export const action: ActionFunction = async ({ request }) => {
  
  console.log('hit');

  const { data, error } = await resend.emails.send({
    from: 'REMIX <onboarding@resend.dev>',
    to: ['xxx'],
    subject: 'hello youtube',
    html: emailHtml
  });

  if(error){
    return json({ error}, 400)
  }

  return json({ data }, 200)

    
}




const CreateCampaingForm:React.FC<CreateCampaingFormProps> = ({ activate, setActivate }) => {


 const handleChange = useCallback(() => setActivate(!activate), [activate, setActivate])


 const activator = <Button onClick={handleChange}>Create new</Button>


 const [value, setValue] = useState('default');

 const handleChangeText = useCallback((newValue: string) => setValue(newValue), [])




 const submit = useSubmit();
 const actionData = useActionData<typeof action>()

 console.log(actionData, 'CreateCampaingForm')

 const sendEmails = () => submit({}, { replace: true, method: 'POST'})
 


  return (
    <Page>
        <Frame>
            <Modal 
              activator={activator}
              open={activate}
              onClose={handleChange}
              title="Create a new Email Campaing"
              primaryAction={{
                content: 'Send',
                onAction: sendEmails
              }}
              secondaryActions={[{
                content: 'Finish Later',
                onAction: handleChange
               }]}

              >

            <Modal.Section>
                <Form onSubmit={sendEmails} method="post" action="/app/createcampaingform">
                    <Layout>
                        <Layout.Section>
                            <TextField
                              label="Campaing Name"
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

            </Modal.Section>
            </Modal>
        </Frame>
    </Page>
    );
};

export default CreateCampaingForm;
