import React from "react";
import {
  Container,
  Typography,
  Link as MuiLink,
  List,
  ListItem,
  Divider,
  Box,
  Theme, // Import Theme
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom"; // Import RouterLink for internal links
import { SxProps } from "@mui/system"; // Import SxProps

import { useLayoutState } from "../../context";
import {
  DRAWER_MAIN_WIDTH,
  DRAWER_SECONDARY_FULL,
  DRAWER_SECONDARY_MINI,
} from "../../constants/layoutConstants";

// Define common styles
const sectionSpacing: SxProps<Theme> = { mb: 3 }; // Margin bottom for sections
const paragraphSpacing: SxProps<Theme> = { mb: 2 }; // Margin bottom for paragraphs

interface TermsAndConditionsPageProps {
  lastUpdatedDate?: string;
  websiteAddress?: string;
  contactEmail?: string;
  companyAddress?: string; // Optional
  privacyPolicyUrl?: string;
  governingLawStateCountry?: string;
  jurisdictionCityCounty?: string;
  userAgeRequirement?: string; // e.g., "13 years old" or "18 years old"
  noticePeriodForChanges?: string; // e.g., "30 days'"
  liabilityCapAmount?: string; // e.g., "$100.00"
}

const TermsAndConditionsPage: React.FC<TermsAndConditionsPageProps> = ({
  lastUpdatedDate = "May 20, 2025",
  websiteAddress = "[YourWebsiteAddress.com]",
  contactEmail = "cmyers880@gmail.com",
  companyAddress = "[Your Physical Address, if applicable]",
  privacyPolicyUrl = "/privacypolicy", // Default, can be overridden
  governingLawStateCountry = "The State of Wisconsin",
  jurisdictionCityCounty = "Racine",
  userAgeRequirement = "12 years old", // Default
  noticePeriodForChanges = "30 days'",
  liabilityCapAmount = "$100.00",
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
        {" "}
        {/* py for padding top and bottom */}
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={sectionSpacing}
        >
          Terms and Conditions for Pronto NPC Generator
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={paragraphSpacing}>
          <strong>Last Updated:</strong> {lastUpdatedDate}
        </Typography>
        <Typography component="p" sx={paragraphSpacing}>
          Welcome to Pronto NPC Generator! These Terms and Conditions ("Terms")
          govern your access to and use of the Pronto NPC Generator web
          application, including any content, functionality, and services
          offered on or through{" "}
          <MuiLink
            href={`https://${websiteAddress}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {websiteAddress}
          </MuiLink>{" "}
          (the "Service"), a Software as a Service (SaaS) application designed
          for generating Non-Player Characters (NPCs) for role-playing games
          (RPGs) and detailed character generation for storytellers. Our Service
          focuses on creating characters with depth by generating crucial
          elements such as desires, flaws, motivations, and connections.
        </Typography>
        <Typography component="p" sx={paragraphSpacing}>
          Please read these Terms carefully before you start to use the Service.
          By using the Service, or by clicking to accept or agree to the Terms
          when this option is made available to you, you accept and agree to be
          bound and abide by these Terms and our Privacy Policy, incorporated
          herein by reference. If you do not want to agree to these Terms or the
          Privacy Policy, you must not access or use the Service.
        </Typography>
        {/* Section 1 */}
        <Box sx={sectionSpacing}>
          <Typography variant="h5" component="h2" gutterBottom>
            1. Description of Service
          </Typography>
          <Typography component="p" sx={paragraphSpacing}>
            Pronto NPC Generator provides users with tools to generate detailed
            character profiles, including but not limited to, their desires,
            flaws, motivations, and interpersonal connections. These generated
            characters are intended for use in RPGs, storytelling, and other
            creative endeavors. The Service utilizes algorithms and user inputs
            to create unique and memorable NPC descriptions.
          </Typography>
        </Box>
        {/* Section 2 */}
        <Box sx={sectionSpacing}>
          <Typography variant="h5" component="h2" gutterBottom>
            2. User Accounts
          </Typography>
          <Typography component="p" sx={paragraphSpacing}>
            <strong>Account Creation:</strong> To access certain features of the
            Service, you may be required to create an account. You agree to
            provide accurate, current, and complete information during the
            registration process and to update such information to keep it
            accurate, current, and complete.
          </Typography>
          <Typography component="p" sx={paragraphSpacing}>
            <strong>Account Responsibility:</strong> You are responsible for
            safeguarding your account password and for any activities or actions
            under your account, whether or not you have authorized such
            activities or actions. You agree to notify us immediately of any
            unauthorized use of your account.
          </Typography>
          <Typography component="p" sx={paragraphSpacing}>
            <strong>Eligibility:</strong> You must be at least{" "}
            {userAgeRequirement} to use the Service. If you are under the age of
            majority in your jurisdiction, you may only use the Service with the
            consent of your parent or legal guardian.
          </Typography>
        </Box>
        {/* Section 3 */}
        <Box sx={sectionSpacing}>
          <Typography variant="h5" component="h2" gutterBottom>
            3. User Inputs and Content
          </Typography>
          <Typography component="p" sx={paragraphSpacing}>
            <strong>Responsibility for Inputs:</strong> You are solely
            responsible for any information, text, prompts, or other materials
            you provide or upload to the Service ("User Inputs"). You represent
            and warrant that you have all necessary rights to provide User
            Inputs and that your User Inputs do not violate any applicable laws
            or infringe upon the rights of any third party, including
            intellectual property rights and privacy rights.
          </Typography>
          <Typography component="p" sx={paragraphSpacing}>
            <strong>Prohibited Inputs:</strong> You agree not to provide User
            Inputs that are unlawful, harmful, threatening, abusive, harassing,
            defamatory, vulgar, obscene, libelous, invasive of another's
            privacy, hateful, or racially, ethnically, or otherwise
            objectionable. You also agree not to input personal data of third
            parties without their explicit consent.
          </Typography>
          <Typography component="p" sx={paragraphSpacing}>
            <strong>License to User Inputs:</strong> By providing User Inputs to
            the Service, you grant Pronto NPC Generator a worldwide,
            non-exclusive, royalty-free, sublicensable, and transferable license
            to use, reproduce, distribute, prepare derivative works of, display,
            and perform your User Inputs in connection with operating and
            improving the Service, and for developing new products and services.
            This license includes the right for us to analyze User Inputs to
            enhance the character generation process. This license survives
            termination of your account.
          </Typography>
        </Box>
        {/* Section 4 */}
        <Box sx={sectionSpacing}>
          <Typography variant="h5" component="h2" gutterBottom>
            4. Generated Characters (Outputs)
          </Typography>
          <Typography component="p" sx={paragraphSpacing}>
            <strong>Nature of Generated Content:</strong> You acknowledge that
            the characters generated by the Service ("Generated Characters" or
            "Outputs") are created by an algorithmic process. While we strive to
            provide rich and detailed characters, Pronto NPC Generator makes no
            representations or warranties regarding the accuracy, completeness,
            suitability, or uniqueness of any Generated Character. Outputs may
            occasionally be repetitive, incomplete, or not perfectly align with
            your expectations.
          </Typography>
          <Typography component="p" sx={paragraphSpacing}>
            <strong>Use of Generated Characters:</strong> Subject to your
            compliance with these Terms, Pronto NPC Generator grants you a
            worldwide, non-exclusive, royalty-free license to use the Generated
            Characters for your personal and commercial creative projects, such
            as RPG campaigns, stories, and other literary or artistic works.
          </Typography>
          <Typography component="p" sx={paragraphSpacing}>
            <strong>No Guarantee of Uniqueness:</strong> Due to the nature of
            generative AI, similar User Inputs may result in similar or
            identical Generated Characters for different users. You understand
            and agree that Generated Characters may not be unique, and Pronto
            NPC Generator shall have no liability for any similarity between
            Generated Characters created for you and those created for other
            users.
          </Typography>
          <Typography component="p" sx={paragraphSpacing}>
            <strong>Disclaimer:</strong> The Generated Characters are provided
            "as is" and for creative inspiration. They are not intended to
            provide advice or information that should be relied upon without
            independent verification. You are responsible for how you use the
            Generated Characters and for ensuring such use complies with all
            applicable laws and regulations.
          </Typography>
        </Box>
        {/* Section 5 */}
        <Box sx={sectionSpacing}>
          <Typography variant="h5" component="h2" gutterBottom>
            5. Intellectual Property Rights
          </Typography>
          <Typography component="p" sx={paragraphSpacing}>
            <strong>Our Intellectual Property:</strong> The Service and its
            entire contents, features, and functionality (including but not
            limited to all information, software, text, displays, images, video,
            and audio, and the design, selection, and arrangement thereof, and
            the underlying AI models and algorithms) are owned by Pronto NPC
            Generator, its licensors, or other providers of such material and
            are protected by copyright, trademark, patent, trade secret, and
            other intellectual property or proprietary rights laws. These Terms
            permit you to use the Service for your personal and commercial use
            as outlined herein. You must not reproduce, distribute, modify,
            create derivative works of, publicly display, publicly perform,
            republish, download, store, or transmit any of the material on our
            Service, except as incidentally necessary to use the Service as
            intended.
          </Typography>
          <Typography component="p" sx={paragraphSpacing}>
            <strong>Your Content:</strong> Subject to the license granted to us
            for User Inputs, you retain any intellectual property rights you may
            have in your original User Inputs.
          </Typography>
          <Typography component="p" sx={paragraphSpacing}>
            <strong>Ownership of Generated Characters:</strong> While you are
            granted a broad license to use the Generated Characters as described
            in Section 4, you acknowledge that:
          </Typography>
          <List sx={{ ...paragraphSpacing, listStyleType: "disc", pl: 4 }}>
            <ListItem sx={{ display: "list-item", p: 0 }}>
              <Typography component="span">
                Pronto NPC Generator and its licensors retain all rights, title,
                and interest in and to the underlying AI models, algorithms, and
                a vast library of character elements and tropes used to generate
                the Outputs.
              </Typography>
            </ListItem>
            <ListItem sx={{ display: "list-item", p: 0 }}>
              <Typography component="span">
                You cannot claim exclusive ownership or copyright over the
                fundamental AI-generated aspects of a Character that could
                prevent other users from generating or using similar characters.
                Your rights pertain to the specific compilation of elements
                generated based on your unique prompts and subsequent
                modifications you make.
              </Typography>
            </ListItem>
            <ListItem sx={{ display: "list-item", p: 0 }}>
              <Typography component="span">
                You may not use the Generated Characters in a way that implies
                endorsement by Pronto NPC Generator or in any manner that is
                misleading or unlawful.
              </Typography>
            </ListItem>
          </List>
          <Typography component="p" sx={paragraphSpacing}>
            <strong>Feedback:</strong> If you provide us with any feedback,
            suggestions, or ideas regarding the Service ("Feedback"), you hereby
            grant us a perpetual, irrevocable, worldwide, royalty-free,
            fully-paid-up, non-exclusive, sublicensable, transferable license to
            use, reproduce, modify, adapt, publish, translate, create derivative
            works from, distribute, and display such Feedback for any purpose,
            without any obligation to compensate you.
          </Typography>
        </Box>
        {/* Section 6 */}
        <Box sx={sectionSpacing}>
          <Typography variant="h5" component="h2" gutterBottom>
            6. Acceptable Use
          </Typography>
          <Typography paragraph>You agree not to use the Service:</Typography>
          <List sx={{ ...paragraphSpacing, listStyleType: "disc", pl: 4 }}>
            {[
              "In any way that violates any applicable federal, state, local, or international law or regulation.",
              "For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way by exposing them to inappropriate content, asking for personally identifiable information, or otherwise.",
              "To generate content that is defamatory, obscene, indecent, abusive, offensive, harassing, violent, hateful, inflammatory, or otherwise objectionable.",
              "To generate content that promotes sexually explicit or pornographic material, violence, or discrimination based on race, sex, religion, nationality, disability, sexual orientation, or age.",
              "To infringe any patent, trademark, trade secret, copyright, or other intellectual property or other rights of any other person.",
              "To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service, or which, as determined by us, may harm Pronto NPC Generator or users of the Service or expose them to liability.",
              "To reverse engineer, decompile, disassemble, or otherwise attempt to discover the source code or underlying ideas or algorithms of the Service.",
              "To use any robot, spider, or other automatic device, process, or means to access the Service for any purpose, including monitoring or copying any of the material on the Service, without our prior written consent.",
            ].map((text, index) => (
              <ListItem key={index} sx={{ display: "list-item", p: 0 }}>
                <Typography component="span">{text}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>
        {/* Section 7 */}
        <Box sx={sectionSpacing}>
          <Typography variant="h5" component="h2" gutterBottom>
            7. Fees and Payment (If Applicable)
          </Typography>
          <Typography component="p" sx={paragraphSpacing}>
            If any part of the Service requires payment of fees (e.g.,
            subscription plans), you agree to pay all applicable fees as
            described on the Service. All fees are non-refundable except as
            required by law or as otherwise explicitly stated by us. We reserve
            the right to change our prices and to institute new charges at any
            time, upon notice to you, which may be sent by email or posted on
            the Service. Your continued use of the Service following such
            notification constitutes your acceptance of any new or increased
            charges.
            {/* This section is a placeholder. Actual implementation would require integration with a payment system and more detailed terms. */}
          </Typography>
        </Box>
        {/* Section 8 */}
        <Box sx={sectionSpacing}>
          <Typography variant="h5" component="h2" gutterBottom>
            8. Data Privacy
          </Typography>
          <Typography component="p" sx={paragraphSpacing}>
            Your privacy is important to us. Our{" "}
            <MuiLink
              component={RouterLink}
              to={privacyPolicyUrl}
              // color="secondary"
            >
              Privacy Policy{" "}
            </MuiLink>
            outlines our practices regarding the collection, explains how we
            collect, use, and share your personal information and User Inputs.
            By using the Service, you consent to the collection and use of your
            information as set forth in the Privacy Policy.
          </Typography>
        </Box>
        {/* Section 9 */}
        <Box sx={sectionSpacing}>
          <Typography variant="h5" component="h2" gutterBottom>
            9. Term and Termination
          </Typography>
          <Typography component="p" sx={paragraphSpacing}>
            <strong>Term:</strong> These Terms will remain in full force and
            effect while you use the Service.
          </Typography>
          <Typography component="p" sx={paragraphSpacing}>
            <strong>Termination by You:</strong> You may terminate your account
            and these Terms at any time by{" "}
            {/* Replace with actual procedure, e.g., "contacting us at " */}
            <MuiLink href={`mailto:${contactEmail}`}>{contactEmail}</MuiLink>
            {/* or "using the account deletion feature in your account settings". */}
          </Typography>
          <Typography component="p" sx={paragraphSpacing}>
            <strong>Termination by Us:</strong> We may suspend or terminate your
            access to all or any part of the Service at any time, with or
            without cause, with or without notice, effective immediately.
            Reasons for termination may include, but are not limited to, your
            breach of these Terms.
          </Typography>
          <Typography component="p" sx={paragraphSpacing}>
            <strong>Effect of Termination:</strong> Upon termination, all
            licenses and rights granted to you under these Terms will
            immediately cease. Provisions that, by their nature, should survive
            termination shall survive termination, including, without
            limitation, ownership provisions, warranty disclaimers, indemnity,
            and limitations of liability.
          </Typography>
        </Box>
        {/* Section 10 */}
        <Box sx={sectionSpacing}>
          <Typography variant="h5" component="h2" gutterBottom>
            10. Disclaimers
          </Typography>
          <Typography component="p" sx={paragraphSpacing}>
            THE SERVICE AND THE GENERATED CHARACTERS ARE PROVIDED ON AN "AS IS"
            AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER
            EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED
            WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
            NON-INFRINGEMENT, AND ANY WARRANTIES ARISING OUT OF COURSE OF
            DEALING OR USAGE OF TRADE.
          </Typography>
          <Typography component="p" sx={paragraphSpacing}>
            PRONTO NPC GENERATOR DOES NOT WARRANT THAT THE SERVICE WILL BE
            UNINTERRUPTED, SECURE, OR ERROR-FREE; NOR DOES IT MAKE ANY WARRANTY
            AS TO THE ACCURACY, COMPLETENESS, RELIABILITY, OR QUALITY OF THE
            GENERATED CHARACTERS OR ANY CONTENT AVAILABLE THROUGH THE SERVICE.
            YOU ACKNOWLEDGE THAT THE OUTPUTS ARE GENERATED BY ARTIFICIAL
            INTELLIGENCE AND MAY CONTAIN INACCURACIES, BIASES, OR UNINTENDED
            CONTENT.
          </Typography>
        </Box>
        {/* Section 11 */}
        <Box sx={sectionSpacing}>
          <Typography variant="h5" component="h2" gutterBottom>
            11. Limitation of Liability
          </Typography>
          <Typography component="p" sx={paragraphSpacing}>
            TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL
            PRONTO NPC GENERATOR, ITS AFFILIATES, LICENSORS, SERVICE PROVIDERS,
            EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF
            ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION
            WITH YOUR USE, OR INABILITY TO USE, THE SERVICE, ANY WEBSITES LINKED
            TO IT, ANY CONTENT ON THE SERVICE OR SUCH OTHER WEBSITES, OR THE
            GENERATED CHARACTERS, INCLUDING ANY DIRECT, INDIRECT, SPECIAL,
            INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT
            LIMITED TO, PERSONAL INJURY, PAIN AND SUFFERING, EMOTIONAL DISTRESS,
            LOSS OF REVENUE, LOSS OF PROFITS, LOSS OF BUSINESS OR ANTICIPATED
            SAVINGS, LOSS OF USE, LOSS OF GOODWILL, LOSS OF DATA, AND WHETHER
            CAUSED BY TORT (INCLUDING NEGLIGENCE), BREACH OF CONTRACT, OR
            OTHERWISE, EVEN IF FORESEEABLE.
          </Typography>
          <Typography component="p" sx={paragraphSpacing}>
            OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING FROM OR RELATING
            TO THE SERVICE OR THE GENERATED CHARACTERS IS LIMITED TO THE GREATER
            OF (A) THE AMOUNT PAID BY YOU, IF ANY, FOR ACCESSING THE SERVICE
            DURING THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE DATE OF YOUR
            CLAIM OR (B) {liabilityCapAmount}.
          </Typography>
        </Box>
        {/* Section 12 */}
        <Box sx={sectionSpacing}>
          <Typography variant="h5" component="h2" gutterBottom>
            12. Indemnification
          </Typography>
          <Typography component="p" sx={paragraphSpacing}>
            You agree to defend, indemnify, and hold harmless Pronto NPC
            Generator, its affiliates, licensors, and service providers, and its
            and their respective officers, directors, employees, contractors,
            agents, licensors, suppliers, successors, and assigns from and
            against any claims, liabilities, damages, judgments, awards, losses,
            costs, expenses, or fees (including reasonable attorneys' fees)
            arising out of or relating to your violation of these Terms or your
            use of the Service, including, but not limited to, your User Inputs,
            any use of the Generated Characters other than as expressly
            authorized in these Terms, or your use of any information obtained
            from the Service.
          </Typography>
        </Box>
        {/* Section 13 */}
        <Box sx={sectionSpacing}>
          <Typography variant="h5" component="h2" gutterBottom>
            13. Modifications to Terms
          </Typography>
          <Typography component="p" sx={paragraphSpacing}>
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. If a revision is material, we will provide
            at least {noticePeriodForChanges} notice prior to any new terms
            taking effect. What constitutes a material change will be determined
            at our sole discretion. By continuing to access or use our Service
            after any revisions become effective, you agree to be bound by the
            revised terms. If you do not agree to the new terms, you are no
            longer authorized to use the Service.
          </Typography>
        </Box>
        {/* Section 14 */}
        <Box sx={sectionSpacing}>
          <Typography variant="h5" component="h2" gutterBottom>
            14. Governing Law and Dispute Resolution
          </Typography>
          <Typography component="p" sx={paragraphSpacing}>
            These Terms and any dispute or claim arising out of, or related to
            them, their subject matter, or their formation (in each case,
            including non-contractual disputes or claims) shall be governed by
            and construed in accordance with the internal laws of{" "}
            {governingLawStateCountry}
            without giving effect to any choice or conflict of law provision or
            rule.
          </Typography>
          <Typography component="p" sx={paragraphSpacing}>
            Any legal suit, action, or proceeding arising out of, or related to,
            these Terms or the Service shall be instituted exclusively in the
            federal courts of the United States or the courts of{" "}
            {governingLawStateCountry} located in {jurisdictionCityCounty}. You
            waive any and all objections to the exercise of jurisdiction over
            you by such courts and to venue in such courts.
          </Typography>
          {/* <Typography component="p" sx={paragraphSpacing}>
            [Optional: Consider adding an arbitration clause or a clause for informal dispute resolution first.]
          </Typography> */}
        </Box>
        {/* Section 15 */}
        <Box sx={sectionSpacing}>
          <Typography variant="h5" component="h2" gutterBottom>
            15. Miscellaneous
          </Typography>
          <Typography component="p" sx={paragraphSpacing}>
            <strong>Entire Agreement:</strong> These Terms and our Privacy
            Policy constitute the sole and entire agreement between you and
            Pronto NPC Generator regarding the Service and supersede all prior
            and contemporaneous understandings, agreements, representations, and
            warranties, both written and oral, regarding the Service.
          </Typography>
          <Typography component="p" sx={paragraphSpacing}>
            <strong>Waiver and Severability:</strong> No waiver by Pronto NPC
            Generator of any term or condition set out in these Terms shall be
            deemed a further or continuing waiver of such term or condition or a
            waiver of any other term or condition, and any failure of Pronto NPC
            Generator to assert a right or provision under these Terms shall not
            constitute a waiver of such right or provision. If any provision of
            these Terms is held by a court or other tribunal of competent
            jurisdiction to be invalid, illegal, or unenforceable for any
            reason, such provision shall be eliminated or limited to the minimum
            extent such that the remaining provisions of the Terms will continue
            in full force and effect.
          </Typography>
          <Typography component="p" sx={paragraphSpacing}>
            <strong>Assignment:</strong> You may not assign any of your rights
            or delegate any of your obligations under these Terms without our
            prior written consent. Any purported assignment or delegation in
            violation of this Section is null and void. We may assign our rights
            or delegate our obligations under these Terms without restriction.
          </Typography>
        </Box>
        {/* Section 16 */}
        <Box sx={sectionSpacing}>
          <Typography variant="h5" component="h2" gutterBottom>
            16. Contact Information
          </Typography>
          <Typography paragraph>
            If you have any questions about these Terms, please contact us at:
            <br />
            <MuiLink href={`mailto:${contactEmail}`}>{contactEmail}</MuiLink>
            {companyAddress &&
              companyAddress !== "[Your Physical Address, if applicable]" && (
                <>
                  <br />
                  {companyAddress}
                </>
              )}
          </Typography>
        </Box>
        <Divider sx={{ my: 4 }} /> {/* my for margin top and bottom */}
        <Box sx={{ backgroundColor: "action.hover", p: 2, borderRadius: 1 }}>
          <Typography variant="body2" color="text.secondary">
            <strong>Disclaimer:</strong> This is a generic template and may not
            be suitable for all situations. It is highly recommended that you
            consult with a legal professional to ensure these Terms and
            Conditions are appropriate for your specific application, data
            handling practices, and jurisdiction, particularly given the
            complexities surrounding AI-generated content and intellectual
            property. You will need to replace bracketed information and
            placeholders (like those passed as props to this component) with
            your specific details. You will also need a separate, comprehensive
            Privacy Policy.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default TermsAndConditionsPage;

// Example Usage (in another component or App.tsx):
//
// import TermsAndConditionsPage from './TermsAndConditionsPage';
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
//         <TermsAndConditionsPage
//           lastUpdatedDate="May 20, 2025"
//           websiteAddress="pronto-npc-generator.com"
//           contactEmail="support@pronto-npc-generator.com"
//           companyAddress="123 AI Lane, Tech City, TC 54321"
//           privacyPolicyUrl="/privacy" // Or full URL
//           governingLawStateCountry="the State of California"
//           jurisdictionCityCounty="San Francisco County"
//           userAgeRequirement="16 years old, or 13 with parental consent"
//           noticePeriodForChanges="15 days'"
//           liabilityCapAmount="$50.00"
//         />
//         {/* Other app content */}
//       </div>
//     </ThemeProvider>
//   );
// }
//
// export default App;
