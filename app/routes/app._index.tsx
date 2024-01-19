import { Button, ButtonGroup, Card, Layout, Page, Text } from "@shopify/polaris";
import React from "react";

type Props = {};

const Index = (props: Props) => {
  return (<Page>

<Layout>
  <Layout.Section>
  <Text variant="heading3xl" as="h2">
        Quick Actions
      </Text>
      <br/>
      <ButtonGroup>
      <Button>Add a subscriber</Button>
      <Button variant="primary">Import contacts</Button>
      <Button variant="primary">Connect an integration</Button>

    </ButtonGroup>

  </Layout.Section>
  <Layout.Section>
  <Text variant="heading3xl" as="h2">
        Email Performance
      </Text>
  <Card>
      <Text as="h2" variant="bodyMd">
        Content inside a card
      </Text>
    </Card>
  </Layout.Section>
  

</Layout>

  </Page>);
};

export default Index;
