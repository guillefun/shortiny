import Link from 'next/link';
import Button from 'shortiny/app/_components/ui/button/button';
import { auth } from "shortiny/server/auth";
import UrlForm from "../../_components/ui/form/url-form";
import { IoMdArrowRoundBack } from "react-icons/io";
import { ButtonSize } from 'shortiny/core/models/form.interface';

export default async function Board() {
    const session = await auth();
    return (
      <>
      <section className="pt-2 pb-4">
        <Link href="/board" className="w-fit flex">
          <Button size={ButtonSize.icon}>
            <IoMdArrowRoundBack />
          </Button>
        </Link>
      </section>
      <section>
          <UrlForm host={process.env.HOSTNAME!} session={session} />
        </section>
      </>
  )
}
