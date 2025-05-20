import React from "react";
import {
  Container,
  Typography,
  Link,
  List,
  ListItem,
  // ListItemText, // Use Typography in ListItem for more control if needed
  Divider,
  Box,
  Theme,
} from "@mui/material";
import { SxProps } from "@mui/system";

import { useLayoutState } from "../../context";
import {
  DRAWER_MAIN_WIDTH,
  DRAWER_SECONDARY_FULL,
  DRAWER_SECONDARY_MINI,
} from "../../constants/layoutConstants";

// Define common styles
const sectionSpacing: SxProps<Theme> = { mb: 3, mt: 3 }; // Margin top and bottom for sections
const paragraphSpacing: SxProps<Theme> = { mb: 2 }; // Margin bottom for paragraphs
const subSectionTitleSpacing: SxProps<Theme> = { mt: 2, mb: 1 };

interface PrivacyPolicyPageProps {
  lastUpdatedDate?: string;
  websiteAddress?: string;
  contactEmail?: string;
  companyName?: string;
  companyAddress?: string; // Optional
  privacyInquiriesEmail?: string;
}

const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({
  lastUpdatedDate = "May 20, 2025", // From context
  websiteAddress = "[YourWebsiteAddress.com]",
  contactEmail = "cmyers880@gmail.com", // General support
  companyName = "Pronto NPC Generator", // Default or "[Your Company Name, if applicable]"
  companyAddress = "720 S Marquette St, #217, Racine, WI 53403", // Optional
  privacyInquiriesEmail = "cmyers880@gmail.com",
}) => {
  const { navViewMode, drawerMini, isAuthenticated } = useLayoutState();

  const leftOffset =
    (navViewMode === 1 ? DRAWER_MAIN_WIDTH : 0) +
    (isAuthenticated
      ? drawerMini
        ? DRAWER_SECONDARY_MINI
        : DRAWER_SECONDARY_FULL
      : 0);
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        mt: 3,
        ml: `${leftOffset}px`,
        transition: (theme) =>
          theme.transitions.create("margin-left", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
      }}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 1 }}>
          Privacy Policy for {companyName}
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          gutterBottom
          sx={paragraphSpacing}
        >
          <strong>Last Updated:</strong> {lastUpdatedDate}
        </Typography>

        {/* Section 1: Introduction */}
        <Box sx={sectionSpacing}>
          <Typography variant="h5" component="h2" gutterBottom>
            1. Introduction
          </Typography>
          <Typography paragraph sx={paragraphSpacing}>
            Welcome to {companyName} ("Pronto," "we," "us," or "our"). We
            provide a Software as a Service (SaaS) web application (the
            "Service") used to generate Non-Player Characters for RPG games and
            for detailed character generation for storytellers. This Privacy
            Policy explains how we collect, use, disclose, and safeguard your
            information when you visit our website{" "}
            <Link
              href={`https://${websiteAddress}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {websiteAddress}
            </Link>{" "}
            and use our Service.
          </Typography>
          <Typography paragraph sx={paragraphSpacing}>
            We are committed to protecting your privacy. This policy is intended
            to be transparent about our data practices and is applicable to all
            users, including residents of the State of Wisconsin. While
            Wisconsin does not currently have a comprehensive consumer privacy
            law akin to those in some other states, we adhere to principles of
            data minimization, security, and transparency, and comply with
            applicable Wisconsin and federal laws regarding data privacy and
            security, including Wisconsin Statutes § 134.98 concerning data
            breach notifications.
          </Typography>
          <Typography paragraph sx={paragraphSpacing}>
            Please read this Privacy Policy carefully. If you do not agree with
            the terms of this Privacy Policy, please do not access or use the
            Service.
          </Typography>
        </Box>

        {/* Section 2: Information We Collect */}
        <Box sx={sectionSpacing}>
          <Typography variant="h5" component="h2" gutterBottom>
            2. Information We Collect
          </Typography>
          <Typography paragraph sx={paragraphSpacing}>
            We may collect information about you in a variety of ways. The
            information we may collect via the Service includes:
          </Typography>

          <Typography variant="h6" component="h3" sx={subSectionTitleSpacing}>
            a. Personal Data
          </Typography>
          <List sx={{ listStyleType: "disc", pl: 4, ...paragraphSpacing }}>
            <ListItem sx={{ display: "list-item", p: 0.5 }}>
              <Typography component="span">
                <strong>Account Information:</strong> When you register for an
                account, we may collect personally identifiable information,
                such as your name, email address, username, and password.
              </Typography>
            </ListItem>
            <ListItem sx={{ display: "list-item", p: 0.5 }}>
              <Typography component="span">
                <strong>User Inputs for NPC Generation:</strong> To generate
                NPCs, you will provide us with information, prompts, and
                parameters about the characters you wish to create (e.g.,
                desires, flaws, motivations, connections). While we encourage
                you not to input sensitive personal information of real
                individuals, any information you provide in these fields is
                collected.
              </Typography>
            </ListItem>
            <ListItem sx={{ display: "list-item", p: 0.5 }}>
              <Typography component="span">
                <strong>Payment Information:</strong> If you subscribe to paid
                tiers of our Service, we (or our third-party payment processors)
                will collect payment information necessary to process your
                transactions, such as credit card numbers or other payment
                account details. We do not store full credit card numbers
                ourselves.
              </Typography>
            </ListItem>
            <ListItem sx={{ display: "list-item", p: 0.5 }}>
              <Typography component="span">
                <strong>Communications:</strong> If you contact us directly
                (e.g., for customer support), we may receive additional
                information about you such as your name, email address, phone
                number, the contents of the message and/or attachments you may
                send us, and any other information you may choose to provide.
              </Typography>
            </ListItem>
          </List>

          <Typography variant="h6" component="h3" sx={subSectionTitleSpacing}>
            b. Derivative Data (Usage Information)
          </Typography>
          <List sx={{ listStyleType: "disc", pl: 4, ...paragraphSpacing }}>
            <ListItem sx={{ display: "list-item", p: 0.5 }}>
              <Typography component="span">
                <strong>Log and Usage Data:</strong> Information our servers
                automatically collect when you access or use the Service, such
                as your IP address, browser type, operating system, access
                times, pages viewed, actions taken within the application (like
                features used, characters generated), and the referring URL.
              </Typography>
            </ListItem>
            <ListItem sx={{ display: "list-item", p: 0.5 }}>
              <Typography component="span">
                <strong>Generated Content:</strong> We collect and store the
                Non-Player Characters (NPCs) and related details that are
                generated through your use of the Service. This is necessary to
                provide the Service to you and for potential service improvement
                purposes as described below.
              </Typography>
            </ListItem>
          </List>

          <Typography variant="h6" component="h3" sx={subSectionTitleSpacing}>
            c. Cookies and Tracking Technologies
          </Typography>
          <List sx={{ listStyleType: "disc", pl: 4, ...paragraphSpacing }}>
            <ListItem sx={{ display: "list-item", p: 0.5 }}>
              <Typography component="span">
                We may use cookies, web beacons, tracking pixels, and other
                tracking technologies on the Service to help customize and
                improve your experience.
              </Typography>
            </ListItem>
            <ListItem sx={{ display: "list-item", p: 0.5 }}>
              <Typography component="span">
                <strong>Cookies:</strong> A "cookie" is a small text file stored
                on your computer. We may use both session cookies (which expire
                once you close your web browser) and persistent cookies (which
                stay on your computer until you delete them) to provide you with
                a more personal and interactive experience on our Service.
              </Typography>
            </ListItem>
            <ListItem sx={{ display: "list-item", p: 0.5 }}>
              <Typography component="span">
                You can manage your cookie preferences through your browser
                settings. However, if you disable cookies, some features of our
                Service may not operate as intended.
              </Typography>
            </ListItem>
          </List>
        </Box>

        {/* Section 3: How We Use Your Information */}
        <Box sx={sectionSpacing}>
          <Typography variant="h5" component="h2" gutterBottom>
            3. How We Use Your Information
          </Typography>
          <Typography paragraph sx={paragraphSpacing}>
            Having accurate information permits us to provide you with a smooth,
            efficient, and customized experience. Specifically, we may use
            information collected about you via the Service to:
          </Typography>
          <List sx={{ listStyleType: "disc", pl: 4, ...paragraphSpacing }}>
            {[
              "Create and manage your account.",
              "Provide, operate, and maintain the Service, including generating NPCs based on your inputs.",
              "Process your transactions and send you related information, including purchase confirmations and invoices (if applicable).",
              "Improve, personalize, and expand our Service, including analyzing usage patterns and developing new features and functionality.",
              "Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the Service, and for marketing and promotional purposes (you can opt-out of marketing communications).",
              "Send you technical notices, updates, security alerts, and support and administrative messages.",
              "Monitor and analyze trends, usage, and activities in connection with our Service.",
              "Detect, investigate, and prevent fraudulent transactions, unauthorized access to the Service, and other illegal activities.",
              "Enforce our Terms and Conditions and other policies.",
              "Comply with legal and regulatory obligations.",
              "For other business purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns, and to evaluate and improve our Service, products, marketing, and your experience.",
            ].map((text, index) => (
              <ListItem key={index} sx={{ display: "list-item", p: 0.5 }}>
                <Typography component="span">{text}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Section 4: How We Share Your Information */}
        <Box sx={sectionSpacing}>
          <Typography variant="h5" component="h2" gutterBottom>
            4. How We Share Your Information
          </Typography>
          <Typography paragraph sx={paragraphSpacing}>
            We do not sell your Personal Data. We may share information we have
            collected about you in certain situations:
          </Typography>
          <Typography variant="h6" component="h3" sx={subSectionTitleSpacing}>
            a. With Service Providers
          </Typography>
          <Typography paragraph sx={paragraphSpacing}>
            We may share your information with third-party vendors, service
            providers, contractors, or agents who perform services for us or on
            our behalf and require access to such information to do that work
            (e.g., payment processing, data hosting, cloud services, analytics,
            email delivery, customer support). These service providers are
            contractually obligated to protect your information and are
            restricted from using your personal data in any way other than to
            provide services for {companyName}.
          </Typography>

          <Typography variant="h6" component="h3" sx={subSectionTitleSpacing}>
            b. For Legal Reasons and to Protect Rights
          </Typography>
          <Typography paragraph sx={paragraphSpacing}>
            We may disclose your information if required to do so by law or in
            the good faith belief that such action is necessary to: (1) comply
            with a legal obligation, subpoena, or lawful requests by public
            authorities, including to meet national security or law enforcement
            requirements; (2) protect and defend our rights or property; (3)
            prevent or investigate possible wrongdoing in connection with the
            Service; (4) protect the personal safety of users of the Service or
            the public; or (5) protect against legal liability.
          </Typography>

          <Typography variant="h6" component="h3" sx={subSectionTitleSpacing}>
            c. Business Transfers
          </Typography>
          <Typography paragraph sx={paragraphSpacing}>
            We may share or transfer your information in connection with, or
            during negotiations of, any merger, sale of company assets,
            financing, or acquisition of all or a portion of our business to
            another company. We will notify you before your Personal Data is
            transferred and becomes subject to a different privacy policy.
          </Typography>

          <Typography variant="h6" component="h3" sx={subSectionTitleSpacing}>
            d. Aggregated or Anonymized Data
          </Typography>
          <Typography paragraph sx={paragraphSpacing}>
            We may share aggregated or anonymized information that does not
            directly identify you with third parties for research, marketing,
            analytics, or other purposes.
          </Typography>

          <Typography variant="h6" component="h3" sx={subSectionTitleSpacing}>
            e. With Your Consent
          </Typography>
          <Typography paragraph sx={paragraphSpacing}>
            We may disclose your personal information for any other purpose with
            your consent.
          </Typography>
        </Box>

        {/* Section 5: Data Security */}
        <Box sx={sectionSpacing}>
          <Typography variant="h5" component="h2" gutterBottom>
            5. Data Security
          </Typography>
          <Typography paragraph sx={paragraphSpacing}>
            We use administrative, technical, and physical security measures to
            help protect your personal information from unauthorized access,
            use, or disclosure. These measures include data encryption, access
            controls, and secure software development practices. While we have
            taken reasonable steps to secure the personal information you
            provide to us, please be aware that despite our efforts, no security
            measures are perfect or impenetrable, and no method of data
            transmission can be guaranteed against any interception or other
            type of misuse. Any information disclosed online is vulnerable to
            interception and misuse by unauthorized parties.
          </Typography>
          <Typography paragraph sx={paragraphSpacing}>
            In the event of a data breach involving your unencrypted personal
            information, we will notify you in accordance with applicable
            Wisconsin law (e.g., Wis. Stat. § 134.98) and other applicable laws.
          </Typography>
        </Box>

        {/* Section 6: Data Retention */}
        <Box sx={sectionSpacing}>
          <Typography variant="h5" component="h2" gutterBottom>
            6. Data Retention
          </Typography>
          <Typography paragraph sx={paragraphSpacing}>
            We will retain your personal information only for as long as is
            necessary for the purposes set out in this Privacy Policy. This
            includes retaining your information as necessary to comply with our
            legal obligations (for example, if we are required to retain your
            data to comply with applicable laws), resolve disputes, and enforce
            our legal agreements and policies. Generally, account information
            and user-generated content will be retained as long as your account
            is active and for a reasonable period thereafter in case you decide
            to re-activate the Service or for backup and archival purposes.
          </Typography>
          <Typography paragraph sx={paragraphSpacing}>
            Usage data is generally retained for a shorter period, except when
            this data is used to strengthen the security or to improve the
            functionality of our Service, or we are legally obligated to retain
            this data for longer time periods.
          </Typography>
        </Box>

        {/* Section 7: Your Choices and Rights */}
        <Box sx={sectionSpacing}>
          <Typography variant="h5" component="h2" gutterBottom>
            7. Your Choices and Rights
          </Typography>
          <Typography variant="h6" component="h3" sx={subSectionTitleSpacing}>
            a. Account Information
          </Typography>
          <List sx={{ listStyleType: "disc", pl: 4, ...paragraphSpacing }}>
            <ListItem sx={{ display: "list-item", p: 0.5 }}>
              <Typography component="span">
                You may review, change, or update information in your account
                settings at any time.
              </Typography>
            </ListItem>
            <ListItem sx={{ display: "list-item", p: 0.5 }}>
              <Typography component="span">
                You may request deletion of your account by contacting us at{" "}
                <Link href={`mailto:${contactEmail}`}>{contactEmail}</Link>.
                Upon your request to terminate your account, we will deactivate
                or delete your account and information from our active
                databases. However, some information may be retained in our
                files to prevent fraud, troubleshoot problems, assist with any
                investigations, enforce our Terms and Conditions, and/or comply
                with legal requirements.
              </Typography>
            </ListItem>
          </List>

          <Typography variant="h6" component="h3" sx={subSectionTitleSpacing}>
            b. Cookies
          </Typography>
          <Typography paragraph sx={paragraphSpacing}>
            Most web browsers are set to accept cookies by default. If you
            prefer, you can usually choose to set your browser to remove cookies
            and to reject cookies. If you choose to remove cookies or reject
            cookies, this could affect certain features of our Service.
          </Typography>

          <Typography variant="h6" component="h3" sx={subSectionTitleSpacing}>
            c. Marketing Communications
          </Typography>
          <Typography paragraph sx={paragraphSpacing}>
            You may opt-out of receiving marketing emails from us by following
            the unsubscribe link provided in those emails or by contacting us.
            Please note that even if you opt-out of marketing communications, we
            may still send you non-promotional messages, such as those about
            your account or our ongoing business relations.
          </Typography>

          <Typography variant="h6" component="h3" sx={subSectionTitleSpacing}>
            d. Wisconsin Residents
          </Typography>
          <Typography paragraph sx={paragraphSpacing}>
            While Wisconsin law does not currently provide specific rights like
            "right to know" or "right to delete" as seen in some other states'
            comprehensive privacy acts, we are committed to transparency. If you
            have questions about the personal information we hold about you,
            please contact us.
          </Typography>
        </Box>

        {/* Section 8: Children's Privacy */}
        <Box sx={sectionSpacing}>
          <Typography variant="h5" component="h2" gutterBottom>
            8. Children's Privacy
          </Typography>
          <Typography paragraph sx={paragraphSpacing}>
            Our Service is not directed to children under the age of 13 (or a
            higher age threshold if applicable in your jurisdiction, such as 16
            in some cases), and we do not knowingly collect personal information
            from children under 13. If you are a parent or guardian and you are
            aware that your child has provided us with Personal Data without
            your consent, please contact us. If we become aware that we have
            collected Personal Data from children without verification of
            parental consent, we will take steps to remove that information from
            our servers. Our Terms and Conditions specify age eligibility
            requirements for using the Service.
          </Typography>
        </Box>

        {/* Section 9: International Data Transfers */}
        <Box sx={sectionSpacing}>
          <Typography variant="h5" component="h2" gutterBottom>
            9. International Data Transfers
          </Typography>
          <Typography paragraph sx={paragraphSpacing}>
            Your information, including Personal Data, may be transferred to —
            and maintained on — computers located outside of your state,
            province, country, or other governmental jurisdiction where the data
            protection laws may differ from those of your jurisdiction. If you
            are located outside the United States and choose to provide
            information to us, please note that we transfer the data, including
            Personal Data, to the United States and process it there. Your
            consent to this Privacy Policy followed by your submission of such
            information represents your agreement to that transfer.
          </Typography>
        </Box>

        {/* Section 10: Links to Other Websites */}
        <Box sx={sectionSpacing}>
          <Typography variant="h5" component="h2" gutterBottom>
            10. Links to Other Websites
          </Typography>
          <Typography paragraph sx={paragraphSpacing}>
            Our Service may contain links to other websites that are not
            operated by us. If you click on a third-party link, you will be
            directed to that third party's site. We strongly advise you to
            review the Privacy Policy of every site you visit. We have no
            control over and assume no responsibility for the content, privacy
            policies, or practices of any third-party sites or services.
          </Typography>
        </Box>

        {/* Section 11: Changes to This Privacy Policy */}
        <Box sx={sectionSpacing}>
          <Typography variant="h5" component="h2" gutterBottom>
            11. Changes to This Privacy Policy
          </Typography>
          <Typography paragraph sx={paragraphSpacing}>
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the "Last Updated" date. You are advised to review this
            Privacy Policy periodically for any changes. Changes to this Privacy
            Policy are effective when they are posted on this page. For material
            changes, we may also notify you through your registered email
            address or a prominent notice on our Service.
          </Typography>
        </Box>

        {/* Section 12: Contact Us */}
        <Box sx={sectionSpacing}>
          <Typography variant="h5" component="h2" gutterBottom>
            12. Contact Us
          </Typography>
          <Typography paragraph sx={paragraphSpacing}>
            If you have any questions or concerns about this Privacy Policy or
            our data practices, please contact us at:
          </Typography>
          <Typography paragraph>
            {companyName}
            <br />
            Attn: Privacy Officer
            <br />
            <Link href={`mailto:${privacyInquiriesEmail}`}>
              {privacyInquiriesEmail}
            </Link>
            {companyAddress &&
              companyAddress !== "[Your Physical Address, if applicable]" && (
                <>
                  <br />
                  {companyAddress}
                </>
              )}
            <br />
            <Link
              href={`https://${websiteAddress}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {websiteAddress}
            </Link>
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box
          sx={{ backgroundColor: "action.hover", p: 2, borderRadius: 1, mt: 2 }}
        >
          <Typography variant="body2" color="text.secondary">
            <strong>Important Disclaimer:</strong> This Privacy Policy is a
            sample and for informational purposes only. It may not be suitable
            for your specific circumstances. You should consult with a qualified
            legal professional to ensure your Privacy Policy is complete,
            accurate, and complies with all applicable state and federal laws.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default PrivacyPolicyPage;

// Example Usage (in another component or App.tsx):
//
// import PrivacyPolicyPage from './PrivacyPolicyPage';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
//
// const theme = createTheme(); // Create a default theme or your custom theme
//
// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline /> {/* Ensures consistent baseline styling */}
//       <div>
//         {/* Other app content */}
//         <PrivacyPolicyPage
//           lastUpdatedDate="May 20, 2025"
//           websiteAddress="pronto-npc-generator.com"
//           contactEmail="support@pronto-npc-generator.com"
//           companyName="Pronto Innovations LLC"
//           companyAddress="456 Digital Way, Techville, WI 53123"
//           privacyInquiriesEmail="privacy@pronto-npc-generator.com"
//         />
//         {/* Other app content */}
//       </div>
//     </ThemeProvider>
//   );
// }
//
// export default App;
