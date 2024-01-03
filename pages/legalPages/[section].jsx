import Header from "@/components/layout/Header";
import { useRouter } from "next/router";

const AboutPage = () => (
  <div>
    <Header noMenu={true} />
    <div className="h-16"></div>
    <div className="px-6 h-screen">
      <div className="flex    h-1/2 mx-auto max-w-[1024px] ">
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl  md:text-5xl lg:text-6xl font-bold text-center">
            A place where your passion for anime finds its home.
          </p>

          <p className="md:text-xl lg:text-2xl mt-20 w-2/3 text-center">
            Explore diverse genres, share your favorites, and create
            personalized playlists. At <strong>NEXTANI</strong>, we unite
            through stories and adventures in anime. Join our community and
            discover more!
          </p>
        </div>
      </div>
    </div>
  </div>
);

const ContactPage = () => (
  <div>
    <Header noMenu={true} />
    <div className="h-16"></div>
    <div className="px-6 h-screen">
      <div className="flex    h-1/2 mx-auto max-w-[1024px] ">
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl  md:text-5xl lg:text-6xl font-bold text-center">
            Contact us
          </p>

          <p className="md:text-xl lg:text-2xl mt-10 w-2/3 ">
            Have any questions, feedback, or suggestions? I&apos;m here to help!
            Contact me at{" "}
            <a
              className="underline font-bold"
              href="mailto:contact@nextani.net"
            >
              contact@nextani.net
            </a>
            . As the sole creator of <strong>NEXTANI</strong>, I&apos;m
            committed to continuously improving your experience on this
            platform. Your insights are invaluable, so don&apos;t hesitate to
            reach out!
          </p>
        </div>
      </div>
    </div>
  </div>
);

const TermsOfServicePage = () => (
  <div>
    <Header noMenu={true} />
    <div className="h-16"></div>
    <div className="px-6 h-screen">
      <div className="flex    h-1/2 mx-auto max-w-[1024px] ">
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl  md:text-5xl lg:text-6xl font-bold text-center">
            Terms of Service
          </p>

          <p className="md:text-xl lg:text-2xl mt-10 w-2/3 ">
            By using NEXTANI, you agree to our Terms of Use. Our platform is
            dedicated to sharing and enjoying anime content responsibly. Users
            can create and share playlists, and participate in community
            discussions. Please respect copyright laws, and refrain from posting
            offensive or inappropriate content. We reserve the right to remove
            content that violates our community standards or is harmful to
            others.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const PrivacyPolicyPage = () => (
  <div>
    <Header noMenu={true} />
    <div className="h-16"></div>
    <div className="px-6 h-screen">
      <div className="flex    h-1/2 mx-auto max-w-[1024px] ">
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl  md:text-5xl lg:text-6xl font-bold text-center">
            Privacy Policy
          </p>

          <p className="md:text-xl lg:text-2xl mt-10 w-2/3 ">
            Your privacy is a top priority at NEXTANI. We collect essential data
            to enhance your experience, like account details and preferences for
            personalized content. Rest assured, your personal information is
            kept confidential and is never shared with third parties without
            your explicit consent, except as required by law. Remember, any
            information you share in public comments is visible to others, so
            please share responsibly.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default function LegalPages() {
  const router = useRouter();
  const { section } = router.query;

  switch (section?.toLowerCase()) {
    case "about":
      return <AboutPage />;
    case "contact us":
      return <ContactPage />;
    case "terms of service":
      return <TermsOfServicePage />;
    case "privacy policy":
      return <PrivacyPolicyPage />;
  }
}
