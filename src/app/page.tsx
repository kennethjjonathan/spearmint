import { Button } from "@/components/Button";
import { InputWithLabel } from "@/components/InputWithLabel";

export default function Home() {
  return (
    <main>
      <InputWithLabel label="Your Email" type="email" required/>
      <Button>Test</Button>
    </main>
  );
}
