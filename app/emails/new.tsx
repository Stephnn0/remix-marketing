import { Html } from "@react-email/html";
import { Button } from "@react-email/button";


export function EmialNew(props: {url: any}){
    const { url } = props;

    return (
        <Html>
            <Button href={url}>Click me</Button>
        </Html>
    )
}