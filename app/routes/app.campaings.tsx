import {   InlineGrid, Layout, LegacyCard, Page, Tabs, Text } from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import { tabs } from "~/utils/tabs";
import CreateCampaingForm from "./app.createcampaingform";
import { authenticate } from "~/shopify.server";
import type { LoaderFunctionArgs} from "@remix-run/node";
import { json } from "@remix-run/node";

type Props = {};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  return json({ apiKey: process.env.SHOPIFY_API_KEY || "" });
};



const CampaingsPage = (props: Props) => {
    const [ selected, setSelected ] = useState(0)

    const handleTabChange = useCallback((selectedTabIndex: number) => setSelected(selectedTabIndex), [])


    const [activate, setActivate] = useState(false);



  return (<Page>
    <Layout>
        <Layout.Section>
        <InlineGrid columns={2} >
          <Text variant="heading3xl" as="h2">Campaings</Text>
          
         </InlineGrid>
            </Layout.Section>
            <br/>
            <Layout.Section>
            <LegacyCard>
                <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
                    <LegacyCard.Section title={tabs[selected].content}>
                        {tabs[selected].component}
                    </LegacyCard.Section>
                </Tabs>
            </LegacyCard>
            </Layout.Section>
            <Layout.Section>
              <CreateCampaingForm activate={activate} setActivate={setActivate} />
            </Layout.Section>
    </Layout>    
  </Page>);
};

export default CampaingsPage;
