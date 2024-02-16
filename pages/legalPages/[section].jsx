import Header from "@/components/layout/Header";
import { useRouter } from "next/router";
import { Button, Link, Avatar } from "@nextui-org/react";
const AboutPage = () => (
  <div>
    <Header noMenu={true} />
    <div className="h-16"></div>
    <div className="px-6 h-screen">
      <div className="mx-auto max-w-[1024px] ">
        <div className=" py-12">
          <div className=" mx-auto text-center">
            <h1 className="text-4xl font-bold mb-5 text-indigo-700">
              A place where your passion for anime finds its home.
            </h1>

            <p className="text-lg mb-8">
              Explore diverse genres, find your favorites, and create
              personalized watchlists. At NextAni, we unite through stories and
              adventures in anime.
            </p>

            <Link
              href="/login"
              className="bg-indigo-700 hover:bg-indigo-800 hover:opacity-100 text-white font-medium py-3 px-6 rounded-md"
            >
              Join us and discover more!
            </Link>
          </div>
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
        <div className="container mx-auto p-6">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>

          <p className="mb-5">
            Have any questions, feedback, or suggestions? We&apos;re here to
            help!
          </p>

          <p className="mb-3">
            Contact me directly at{" "}
            <a
              href="mailto:nextani.net@gmail.com"
              className="text-blue-600 hover:underline"
            >
              nextani.net@gmail.com
            </a>
            . As the sole creator of NextAni, I&apos;m committed to continuously
            improving your experience on this platform. Your insights are
            invaluable, so don&apos;t hesitate to reach out!
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
      <div className=" mx-auto max-w-[1024px] pb-6">
        <h1 className="text-3xl font-bold  mb-4">Terms of Service</h1>
        <h2 className="text-2xl font-semibold mb-3">Welcome to NextAni!</h2>
        <p>
          NextAni is a platform dedicated to providing users with a high-quality
          anime experience. We offer a variety of anime content, including
          animation, movies, music, and more.
        </p>
        <p>
          By using the NextAni platform, you agree to be bound by the following
          terms of service:
        </p>

        <h2 className="text-2xl font-semibold mt-4 mb-3">Overview</h2>
        <p>
          We offer a variety of anime content and services, including but not
          limited to:
        </p>
        <ul className="list-disc ml-6">
          <li>Watching anime</li>
          <li>Creating and managing profiles</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-4 mb-3">User Obligations</h2>
        <p>
          When using the NextAni platform, you must adhere to the following code
          of conduct:
        </p>
        <ul className="list-disc list-inside ml-6">
          <li>
            You may not post any illegal or infringing content, including but
            not limited to:
          </li>
          <ul className="list-[circle] ml-6 ">
            <li>Pornographic content</li>
            <li>Violent content</li>
            <li>Hate speech</li>
            <li>
              Content that infringes copyrights or intellectual property rights
            </li>
          </ul>
          <li>You may not harass or bully other users</li>
          <li>
            You may not use any automated tools or scripts to access or use the
            NextAni platform
          </li>
          <li>
            You may not engage in any activity that may damage or disrupt the
            operation of the NextAni platform
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-4 mb-3">
          Platform Rights and Obligations
        </h2>
        <p>
          NextAni retains all ownership and management rights to the content on
          the platform. We have the right to:
        </p>
        <ul className="list-disc ml-6">
          <li>Remove any content that violates the terms of service</li>
          <li>
            Terminate the accounts of any users who violate the terms of service
          </li>
          <li>Make any necessary changes or updates to the platform</li>
        </ul>
        <p>
          NextAni is committed to protecting user data. We will only use your
          data to provide services and improve user experience. We will not
          share your data with any third party unless required by law.
        </p>

        <h2 className="text-2xl font-semibold mt-4 mb-3">Disclaimer</h2>
        <p>
          NextAni makes no warranties, express or implied, about the content and
          services on the platform. We assume no responsibility for any loss or
          damage caused by the use of the NextAni platform.
        </p>

        <h2 className="text-2xl font-semibold mt-4 mb-3">Dispute Resolution</h2>
        <p>
          Any disputes related to the NextAni platform shall be resolved through
          friendly negotiation. If the negotiation fails, the dispute can be
          brought to the court of Japan.
        </p>

        <h2 className="text-2xl font-semibold mt-4 mb-3">Other Terms</h2>
        <p>
          NextAni reserves the right to modify the terms of service at any time.
          We will notify you when the terms of service are modified. Your
          continued use of the NextAni platform signifies your acceptance of the
          revised terms of service.
        </p>

        <p>
          If you have any questions about the terms of service, please contact
          us:{" "}
          <a
            href="mailto:nextani.net@gmail.com"
            className="text-blue-600 hover:underline"
          >
            nextani.net@gmail.com
          </a>
        </p>
      </div>
    </div>
  </div>
);

const PrivacyPolicyPage = () => (
  <div>
    <Header noMenu={true} />
    <div className="h-16"></div>
    <div className="px-6 h-screen">
      <div className=" pb-6  mx-auto max-w-[1024px] ">
        <h1 className="text-3xl font-bold  mb-4">Privacy Policy</h1>

        <p className="mb-4">
          At NextAni, your privacy is a top priority. This Privacy Policy
          outlines the types of information we collect and how we use it to
          enhance your experience while keeping your personal details safe.
        </p>

        <h2 className="text-2xl font-semibold mb-3">Information We Collect</h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            **Account Details:** Information you provide when creating an
            account (e.g., name, email, username).
          </li>
          <li>
            **Viewing History and Preferences:** Data on the content you watch
            and interact with to personalize recommendations.
          </li>
          <li>
            **Technical Information:** Device information, IP address, browser
            type, may be collected for troubleshooting and improving our
            services.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-3">
          How We Use Your Information
        </h2>
        <p className="mb-4">We use your information to:</p>
        <ul className="list-disc list-inside mb-4">
          <li>Provide and personalize your NextAni experience.</li>
          <li>Recommend content based on your interests.</li>
          <li>Improve our services and understand user behavior.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-3">Information Sharing</h2>
        <p className="mb-4">
          We will never share your personal information with third parties
          without your explicit consent, except in limited circumstances
          required by law.
        </p>

        <h2 className="text-2xl font-semibold mb-3">Your Rights</h2>
        <p className="mb-4">You have the right to:</p>
        <ul className="list-disc list-inside mb-4">
          <li>Access and review your personal information.</li>
          <li>Request modifications to your personal information.</li>
          <li>Request deletion of your personal information.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
        <p>
          If you have any questions or concerns about our Privacy Policy, please
          contact us at:{" "}
          <a
            className="text-blue-600 hover:underline"
            href="mailto:nextani.net@gmail.com"
          >
            nextani.net@gmail.com
          </a>
        </p>
      </div>
    </div>
  </div>
);

export default function LegalPages() {
  const router = useRouter();
  const { section } = router.query;

  switch (section) {
    case "About":
      return <AboutPage />;
    case "ContactUs":
      return <ContactPage />;
    case "TermsOfService":
      return <TermsOfServicePage />;
    case "PrivacyPolicy":
      return <PrivacyPolicyPage />;
  }
}
