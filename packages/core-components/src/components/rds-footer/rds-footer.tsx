import { Component, Element, Event, EventEmitter, Host, Prop, h, Listen } from '@stencil/core';

@Component({
  tag: 'rds-footer',
  styleUrl: 'rds-footer.scss',
  shadow: true,
})
export class RdsFooter {
  @Element() el: HTMLRdsFooterElement;

  /**
   * This determines display of the Confidentiality Notice
   */
  @Prop() confidentiality: boolean = false;

  /**
   * @deprecated
   * This determines display of the Disclaimer
   */
  @Prop() disclaimer: boolean = false;

  /**
   * This determines display of the Survey Link
   */
  @Prop() survey: boolean = false;

  /**
   * This is the url for the survey ("Give Feedback") url.
   */
  @Prop({ reflect: true }) surveyUrl: string = 'https://fmglobal.az1.qualtrics.com/jfe/form/SV_bkCKj7GV5vzC2tE';

  /**
   * This determines display of the Help link
   */
  @Prop() help: boolean = true;

  /**
   * This allows the help link to have a dynamic e-mail
   */
  @Prop({ reflect: true }) helpHref: string = 'mailto:drrservicedesk@fmglobal.com';
  /**
   * This determines to set the footer at the bottom of the page.
   */
  @Prop() positionFixed: boolean = false;

  /** Create Element and set its padding-bottom value equal to footer height */
  private setSpaceElement: HTMLDivElement;

  /** Emitted when a footer link is clicked.
   * Use the "onRdsFooterClicked" prop or listen for "rdsFooterClicked" event.
   * This event will emit a string value depending on which link is clicked:
   * "terms", "confidentiality", "privacy", "feedback" and "help"
   */
  @Event() rdsFooterClicked: EventEmitter<any>;

  @Listen('resize', { target: 'window' })
  handleResize() {
    if (this.setSpaceElement) {
      const footerHeight = this.el.shadowRoot.querySelector('.footer-wrapper').clientHeight;

      if (this.setSpaceElement.clientHeight != footerHeight) {
        this.setSpaceElement.style.paddingBottom = footerHeight.toString() + 'px';
      }
    }
  }

  footerClickedHandler(link: any) {
    this.rdsFooterClicked.emit({
      linkClicked: link,
    });
  }

  openTermsModal() {
    const modal = this.el.shadowRoot.getElementById('modal_terms');
    modal.setAttribute('visible', 'true');
  }

  openConfidenialityModal() {
    if (this.el) {
      const modal2 = this.el.shadowRoot.getElementById('modal_confidential');
      modal2.setAttribute('visible', 'true');
    }
  }

  // Supports the onclick / opening of the terms modal
  addTermsListener(): void {
    this.el.shadowRoot.getElementById('terms-link').addEventListener('click', () => {
      this.openTermsModal();
    });
  }

  // Supports the onclick / opening of the confidentiality modal
  addConfidentialityListener(): void {
    this.el.shadowRoot.getElementById('confidentiality-link').addEventListener('click', () => {
      this.openConfidenialityModal();
    });
  }

  addContentSpace(): void {
    const footerHeight = this.el.shadowRoot.querySelector('.footer-wrapper').clientHeight;
    this.setSpaceElement = document.createElement('div') as HTMLDivElement;
    this.setSpaceElement.style.paddingBottom = footerHeight.toString() + 'px';
    this.el.closest('rds-footer').insertAdjacentElement('beforebegin', this.setSpaceElement);
    this.el.shadowRoot.querySelector('.footer-wrapper').classList.add('footer-position');
  }

  componentDidLoad() {
    this.addTermsListener();
    if (this.confidentiality) {
      this.addConfidentialityListener();
    }
    if (!this.setSpaceElement && this.positionFixed === true && !document.querySelector('rds-app-layout')) {
      this.addContentSpace();
    }
  }

  render() {
    return (
      <Host>
        <div class="footer-wrapper">
          <div class="footer-links">
            <rds-link
              appearance="secondary"
              id="terms-link"
              onClick={() => {
                this.footerClickedHandler('terms');
              }}
            >
              Terms
            </rds-link>
            <rds-modal id="modal_terms" visible={false}>
              <rds-headline slot="headline" spacing="none" level={5}>
                CLIENT DATA SHARING POLICY
              </rds-headline>
              <rds-text size="sm">
                <span class="keep-together">FM Global</span> (as defined below) is committed to developing and utilizing innovative products, tools, and services to help keep our
                clients resilient. In order to continue to provide new and state-of-the-art solutions, our data sharing policy allows for the sharing of client data on a
                need-to-know basis with the properly vetted third parties we engage in furtherance of our training, product development and innovation initiatives. We will continue
                to take appropriate measures to protect the confidentiality and security of such data.
              </rds-text>
              <rds-text size="sm">
                This data sharing policy will apply to our use of your company's data unless you have a nondisclosure or confidentiality agreement with{' '}
                <span class="keep-together">FM Global</span>, in which case your company's data will continue to be handled in accordance with the terms of that agreement. If you
                have any questions about how your company's data will be handled by us, please contact your client service team.
              </rds-text>
              <rds-headline level={5}>TERMS OF USE INCORPORATING END-USER LICENSE AGREEMENT</rds-headline>
              <rds-text size="sm">
                These Terms of Use are applicable to your access to and use of <span class="keep-together">FM Global</span> websites, mobile applications, associated microsites,
                email exchanges, affiliated sites and other similar applications (collectively referred to as “Site(s)”) operated by <span class="keep-together">FM Global</span>.
                These Terms of Use incorporate the End-User License Agreement for certain Sites. Throughout this Policy, "<span class="keep-together">FM Global</span>" refers to
                Factory Mutual Insurance Company, including its subsidiaries, affiliates and brands (also referred to as "we", "us", or "our"). Your access to and use of the Site
                and the information, materials, products, and services available through the Site are subject to these Terms of Use, regardless of whether you possess an account
                through the Site linked to your name and/or contact information (“Account”). By accessing or using the Site, you acknowledge that you understand and agree to be
                bound by these Terms of Use. If you do not understand or agree to be bound by these Terms of Use, do not access or use the Site.
              </rds-text>
              <rds-headline level={5}>CHANGES TO THESE TERMS OF USE</rds-headline>
              <rds-text size="sm">
                We reserve the right to modify these Terms of Use, in whole or in part, in our own discretion at any time. Modifications shall be effective immediately upon the
                linking of modified Terms of Use to the Site. You agree to comply with, and be bound by, any such modifications by continuing to use or access the Site after
                modified Terms of Use are posted to the Site. Note that your Account information resides with <span class="keep-together">FM Global</span> and any changes to user
                names, passwords, email address or other information must be made through <span class="keep-together">FM Global</span> and not this Site.
              </rds-text>
              <rds-headline level={5}>END-USER LICENSE AGREEMENT</rds-headline>
              <rds-text size="sm">
                Certain Sites, including but not limited to Client Portal, are proprietary products of <span class="keep-together">FM Global</span> and are intended for the sole
                and exclusive use of the brokers, clients, affiliates, employees, and select business partners of <span class="keep-together">FM Global</span>. Use by any other
                party is prohibited. This End User License Agreement is a binding agreement between you and <span class="keep-together">FM Global</span> and we license use of
                Client Portal to you on the basis of this Agreement. We do not sell the software, content or services to you. We remain the owners at all times. You acknowledge
                that you have no rights in, or to, Client Portal, the contents, services documents or technology other than the right to use each of them in accordance with the
                terms of this Agreement.
              </rds-text>
              <rds-text size="sm">
                To obtain access to Client Portal, you must indicate your acceptance of the following terms and conditions. If you do not wish to be bound to them, you should not
                accept them and should not otherwise try to access the site. The terms of this Agreement apply to any Client Portal content and services, including any updates or
                supplements.
              </rds-text>
              <rds-text size="sm">
                <span class="keep-together">FM Global</span> provides access to Client Portal only in accordance with these terms and conditions:
              </rds-text>
              <rds-text size="sm">
                When you are granted access to Client Portal, you will be prompted to create a profile and an individual password. You are not to share that password with other
                parties, including other employees. You only may access accounts, locations and products assigned to you. Your access will be terminated when it is no longer
                appropriate.
              </rds-text>
              <rds-text size="sm">
                <span class="keep-together">FM Global</span> views, controls, audits and monitors access to, and the use of, all information to which the Client Portal user has
                access, and retains the sole and exclusive right to make format and content changes without prior written notice. You must obtain permission for any third party
                information you post on Client Portal from said third parties. <span class="keep-together">FM Global</span> may, at any time, view any information posted on Client
                Portal and you acknowledge that our Privacy Policy are incorporated into this Agreement.
              </rds-text>
              <rds-text size="sm">
                Information posted on Client Portal is not a part of any insurance policy and does not alter or affect policy language in any way. The language of the actual policy
                in force always is controlling.
              </rds-text>
              <rds-text size="sm">
                Access to Client Portal by clients and business partners is strictly limited to individual employees of the client or business partner on a need-to-know basis as
                part of the insurance or business relationship with <span class="keep-together">FM Global</span>. Any email address should be unique to the named user and not be
                associated to a group or distribution list.
              </rds-text>
              <rds-text size="sm">
                Client Portal and its contents are not intended as an offer to sell a product or service. All product and service descriptions are general in nature.
              </rds-text>
              <rds-text size="sm">
                In consideration of you agreeing to abide by the terms of this Agreement, <span class="keep-together">FM Global</span> grants you a limited, non-exclusive and
                non-transferable license to use Client Portal solely for the express purpose of supporting the insurance or business relationship with{' '}
                <span class="keep-together">FM Global</span> and to access and use the content and services made available in or otherwise accessible, strictly in accordance with
                this Agreement, the Terms of Use and the Privacy Policy. We reserve all other rights.
              </rds-text>
              <rds-text size="sm">
                You shall not copy the content and services, except as expressly permitted by this license; modify, translate, adapt or otherwise create derivative works or
                improvements, whether or not patentable; remove, delete, alter or obscure any trademarks or any copyright, trademark, patent or other intellectual property or
                proprietary rights notices from the Site(s), including any copy thereof; or rent, lease, lend, sell, sublicense, assign, distribute, publish, transfer or otherwise
                make available the Content and Services of Client Portal, to any third party for any reason.
              </rds-text>
              <rds-text size="sm">
                Other than information obtained through other third-parties or data providers (which is the confidential and proprietary information of those respective parties)
                and User-Provided Content provided in accordance with the Terms of Use, the information in Client Portal is the confidential and proprietary information of{' '}
                <span class="keep-together">FM Global</span>. You must not infringe our intellectual property rights or those of any third party in relation to your use of Client
                Portal. Client Portal information may be reproduced in accordance with this Agreement, only for the express purpose of supporting the insurance or business
                relationship between <span class="keep-together">FM Global</span> and the client or business partner. You may not reproduce, distribute, transmit, display, or
                prepare derivative works from the materials in Client Portal without the prior written consent of <span class="keep-together">FM Global</span>, except that you may
                copy and print a limited amount of content only in support of the insurance or business relationship with <span class="keep-together">FM Global</span>.
              </rds-text>
              <rds-text size="sm">
                Where third-party content is displayed, included or made available ("Third Party Materials"), you acknowledge and agree that{' '}
                <span class="keep-together">FM Global</span> is not responsible for Third Party Materials, including their accuracy, completeness, timeliness, validity, copyright
                compliance, legality, decency, quality or any other aspect thereof. <span class="keep-together">FM Global</span> does not assume and will not have any liability or
                responsibility to you or any other person or entity for any Third-Party Materials. Third Party Materials and links thereto are provided solely as a convenience to
                you and you access and use them at entirely at your own risk and subject to such third parties' terms and conditions.
              </rds-text>
              <rds-text size="sm">
                You must not use Client Portal in any unlawful manner, for any unlawful purpose, or in any manner inconsistent with this Agreement, in a way that could damage or
                compromise our systems or security, or act fraudulently or maliciously, for example, by hacking into or inserting malicious code, including viruses, or harmful data
                into any operating system. You must not transmit any material that is defamatory, offensive or otherwise objectionable in relation to your use of Client Portal.
              </rds-text>
              <rds-text size="sm">
                The term of the Agreement commences when you access Client Portal and will continue in effect until terminated by you or{' '}
                <span class="keep-together">FM Global</span>. <span class="keep-together">FM Global</span> may terminate your access to Client Portal at any time for any or no
                reason. In the event of termination of your organization’s insurance or business relationship with <span class="keep-together">FM Global</span>, all further access
                to, and use of, information is strictly prohibited. Information previously reproduced will retain confidential status, and{' '}
                <span class="keep-together">FM Global</span> has the right, upon request, to the return of any and all copies. All rights granted to you under this Agreement will
                also terminate. Termination will not limit any of <span class="keep-together">FM Global</span>'s rights or remedies at law or in equity.
              </rds-text>
              <rds-text size="sm">
                THE LICENSE IS PROVIDED “AS IS” AND WITH ALL FAULTS AND DEFECTS WITHOUT WARRANTY OF ANY KIND. ALTHOUGH <span class="keep-together">FM Global</span> SEEKS TO ENSURE
                THAT INFORMATION IN CLIENT PORTAL IS REASONABLY ACCURATE, CLIENT PORTAL CONTAINS CERTAIN INFORMATION AND TOOLS (INCLUDING, BUT NOT LIMITED TO, CERTAIN
                WEATHER-RELATED DATA) THAT ARE INHERENTLY SUBJECT TO CHANGE. WITH RESPECT TO ANY INFORMATION IN, OR ACCESSIBLE THROUGH, CLIENT PORTAL,{' '}
                <span class="keep-together">FM Global</span> ASSUMES NO RESPONSIBILITY OR LIABILITY FOR ERRORS OR OMISSIONS IN THE INFORMATION, ALL OF WHICH IS PROVIDED ON AN "AS
                IS" BASIS. FURTHERMORE, <span class="keep-together">FM Global</span> ASSUMES NO RESPONSIBILITY OR LIABILITY FOR: INFORMATION POSTED BY A USER, ANY APPOINTMENT OF A
                USER, OR FOR ANY ACTIONS BY A USER. <span class="keep-together">FM Global</span> EXPRESSLY DISCLAIMS ANY AND ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WITHOUT
                LIMITATION WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. ANY LIABILITY OF <span class="keep-together">FM Global</span> TO ITS CLIENTS IS
                LIMITED TO THAT CONTAINED IN ITS INSURANCE POLICIES.
              </rds-text>
              <rds-text size="sm">THE FOLLOWING ADDITIONAL CONDITIONS APPLY TO THE MANAGING USER:</rds-text>
              <rds-text size="sm">
                As a further condition of access to Client Portal, if you are carrying out the role of the Managing User for your organization, you will be bound by the following
                additional terms and conditions. A Managing User, as identified by <span class="keep-together">FM Global</span>, is the individual within your organization who
                determines the level of access granted for all other Client Portal users within your organization or in an external organization. If you do not wish to be bound to
                these terms and conditions, you should not accept them. As the Managing User:
              </rds-text>
              <ol>
                <li>
                  You acknowledge that by granting user access to any party, you will be giving that user authority to see information relating to your organization and comment on
                  all pertinent insurance activities.
                </li>
                <li>
                  Via Client Portal you will:
                  <ol>
                    <li>have access to all products that are shared with your organization;</li>
                    <li>approve user access to Client Portal,</li>
                    <li>
                      have the ability to assign administrative/approval functions to individuals within your organization or in an external organization, as permitted by{' '}
                      <span class="keep-together">FM Global</span>.
                    </li>
                    <li>terminate user access when access is no longer appropriate.</li>
                    <li>
                      Acknowledge that when you assign administrative/approval responsibilities to another person, that individual will have the ability to approve user access to
                      Client Portal on your behalf, but you will continue to be the individual within your organization who assures that the appropriate access is being granted and
                      that the terms and conditions of use are being observed for your organization.
                    </li>
                  </ol>
                </li>
                <li>You acknowledge that you are in a position within your organization that will enable you to fulfill the role of Managing User.</li>
                <li>
                  Applicable to client Managing User: As the insured client, you acknowledge that you have authorized your insurance broker to see information relating to your
                  organization and comment on all pertinent insurance activities. If that authorization is rescinded, you will notify <span class="keep-together">FM Global</span>{' '}
                  immediately.
                </li>
                <li>
                  A Managing User or a user with administrative/approval responsibilities may make requests directly to <span class="keep-together">FM Global</span> to add Client
                  Portal users in your organization. FM Global will act on such requests accordingly, with no further confirmation or approval required by your organization.
                </li>
              </ol>
              <rds-headline level={5}>SITE PRIVACY POLICY</rds-headline>
              <rds-text size="sm">
                Our Site privacy policy (“Privacy Policy”) is a part of these Terms of Use and is incorporated by reference. By accepting these Terms of Use you agree to our
                collection, use, and disclosure of your information as described in the Privacy Policy.{' '}
                <rds-link
                  href="https://www.fmglobal.com/privacy-policy"
                  onClick={() => {
                    this.footerClickedHandler('privacy');
                  }}
                  size="sm"
                  appearance="secondary"
                  target="_blank"
                >
                  Click here to view the Privacy Policy
                </rds-link>
              </rds-text>
              <rds-headline level={5}>INTELLECTUAL PROPERTY</rds-headline>
              <rds-text size="sm">
                All text, graphics, user interfaces, photographs, trademarks, logos, sounds, music, artwork, computer code, and other materials contained on the Site (collectively,
                “Content”) not including User-Provided Content, are owned, controlled, or licensed by or to <span class="keep-together">FM Global</span>, and are protected by trade
                dress, copyright, patent, and trademark laws, and various other intellectual property rights and laws. No license to or right in any such Content is granted to or
                conferred upon you. Except as expressly provided in these Terms of Use, you agree not to use, modify, copy, reproduce, reverse engineer, republish, upload, post,
                transmit, distribute, sell, license, rent, publicly display or perform, edit, adapt or create a derivative work of, in any manner, any Content or any other part of
                the Site, without <span class="keep-together">FM Global’s</span> express prior written consent.
              </rds-text>
              <rds-text size="sm">
                Notwithstanding the above, you may view, use, download, and print selected portions of the Site solely for your own personal informational use; provided that you do
                not republish the Content and that you keep intact all copyright, trademarks, service marks, attributions, patent, and other proprietary notices.
              </rds-text>
              <rds-headline level={5}>YOUR PROVISION OF CONTACT AND ACCOUNT INFORMATION TO US</rds-headline>
              <rds-text size="sm">
                When you provide information about yourself to us, including when you create your Account with <span class="keep-together">FM Global</span> from which information
                is derived for use of this Site, you agree to: (a) provide accurate, current, and complete information about yourself, and not to provide information that attempts
                to impersonate another individual; and (b) maintain and promptly update such information to keep it accurate, current, and complete in accordance with our Privacy
                Policy. If you provide any information that is untrue, inaccurate, or incomplete, or we have reasonable grounds to suspect that such information is untrue,
                inaccurate, or incomplete, we retain the right to suspend or terminate any account you establish and/or to refuse any or all current or future use of the Site or
                any portion thereof.
              </rds-text>
              <rds-headline level={5}>YOUR PROVISION OF INFORMATION ABOUT OTHERS TO US</rds-headline>
              <rds-text size="sm">
                Should you provide information about others to us, you represent and warrant that you have obtained the appropriate consents from that person to provide his/her
                information to <span class="keep-together">FM Global</span>.
              </rds-text>
              <rds-headline level={5}>INFORMATION AND TOOLS PROVIDED THROUGH THE SITES</rds-headline>
              <rds-text size="sm">
                The Site may contain information and tools, including communication tools. You acknowledge and agree that we have no duty or obligation to maintain the accuracy of,
                or update any such information, and agree that your reliance on any such information and tools is at your own risk. Communication through the Site should NOT be
                construed as a legal document or as a replacement to any document or any other notification method that has been previously agreed upon.{' '}
                <span class="keep-together">FM Global</span> does not mandate compliance in any area.
              </rds-text>
              <rds-headline level={5}>PROVIDING OTHERS WITH ACCESS TO THE SITES</rds-headline>
              <rds-text size="sm">
                Certain areas of the Site are accessible by registration only. There is no mechanism by which a user may gain access to these areas of the Site unless they are
                registered as a user through <span class="keep-together">FM Global</span>. If one does not have access granted through <span class="keep-together">FM Global</span>,
                the user will not have access to the Site. The content/information that each User may access through the Site are set and maintained upon initial registration when
                the user is granted access to <span class="keep-together">FM Global</span>.
              </rds-text>
              <rds-headline level={5}>USE/DISCLOSURE OF INFORMATION YOU PROVIDE</rds-headline>
              <rds-text size="sm">
                You agree that we may use any information you provide to us through the Site for the purpose of exercising our legal rights and protecting our interests in the
                event any of the information you provide is relevant or helpful in connection with insurance claims brought by our customers or any legal actions brought by or
                against us. You further agree that we may disclose any information you provide to us through the Site to third parties in connection with, or in anticipation of,
                insurance claims brought by our customers or any legal actions brought by or against us.
              </rds-text>
              <rds-headline level={5}>USER-PROVIDED CONTENT</rds-headline>
              <rds-text size="sm">
                You understand that all information, data, or other materials that you or another user provide in connection with the Site or otherwise communicate to us
                ("User-Provided Content"), is the sole responsibility of you or the person from whom such User-Provided Content originated. This means that you, and not us, are
                responsible for all User-Provided Content that you upload, post, email, transmit, or otherwise make available in connection with the Site. We do not control the
                User-Provided Content posted and, as such, do not guarantee the accuracy, integrity, nature or quality of any User-Provided Content. Under no circumstances will we
                be liable in any way for any User-Provided Content, including, but not limited to, for any errors or omissions in any User-Provided Content, or for any loss or
                damage of any kind incurred as a result of the publication or use of any User-Provided Content posted, emailed, transmitted, or otherwise made available in
                connection with the Site.
              </rds-text>
              <rds-text size="sm">
                You understand that we will take all reasonable or necessary steps, including, but not limited to, cooperation with law enforcement authorities to prevent the Site
                from being used for the purposes of uploading, posting, emailing, transmitting, or otherwise making available any indecent, offensive, harmful, objectionable or
                unlawful content.
              </rds-text>
              <rds-text size="sm">
                By submitting any User-Provided Content to <span class="keep-together">FM Global</span>, you represent and warrant that:
              </rds-text>
              <ul>
                <li>you own or control all rights to User-Provided Content you post on the Site;</li>
                <li>all "moral rights" that you may have in such content have been voluntarily waived by you;</li>
                <li>all content that you post is accurate, does not violate these Terms of Use, and will not cause injury to any person or entity; and</li>
                <li>you are at least 13 years old.</li>
              </ul>
              <rds-headline level={5}>
                YOUR GRANT OF LICENSE TO <span class="keep-together">FM Global</span> FOR USER-PROVIDED CONTENT
              </rds-headline>
              <rds-text size="sm">
                By uploading, posting, emailing, transmitting, or otherwise making available any User-Provided Content, you grant us permission to use such content for the purposes
                of providing underwriting, engineering, loss prevention, business risk consulting, and claims services and for supporting the insurance or business relationship
                between FM Global and the client or business partner.
              </rds-text>
              <rds-headline level={5}>
                <span class="keep-together">FM Global’s</span> DISCRETION TO USE USER-PROVIDED CONTENT
              </rds-headline>
              <rds-text size="sm">
                All User-Provided Content that you submit may be used at <span class="keep-together">FM Global’s</span> sole discretion and in accordance with our Privacy Policy.{' '}
                <span class="keep-together">FM Global</span> reserves the right to change, condense, delete, or refuse to post any User-Provided Content on the Site in its sole
                discretion. <span class="keep-together">FM Global</span> does not guarantee that you will have any recourse through <span class="keep-together">FM Global</span> to
                edit or delete any User-Provided Content you have submitted.
              </rds-text>
              <rds-headline level={5}>YOUR CONDUCT</rds-headline>
              <rds-text size="sm">You agree to comply with all laws, rules, and regulations applicable to your use of the Site. In addition, you agree not to:</rds-text>
              <ul>
                <li>upload, post, email, transmit, or otherwise make available any User-Provided Content that is known by you to be false, inaccurate, or misleading;</li>
                <li>
                  upload, post, email, transmit, or otherwise make available any User-Provided Content that violates any law, statute, ordinance, or regulation (including, but not
                  limited to, those governing export control, consumer protection, unfair competition, anti-discrimination, or false advertising);
                </li>
                <li>
                  upload, post, email, transmit, or otherwise make available any User-Provided Content that is, or may reasonably be considered to be, harmful, threatening,
                  abusive, harassing, tortious, defamatory, vulgar, obscene, libellous, invasive of another's privacy, hateful, or racially, ethnically or otherwise objectionable,
                  or that harms minors in any way;
                </li>
                <li>forge headers or otherwise manipulate identifiers in order to disguise the origin of any User-Provided Content transmitted in connection with the Site;</li>
                <li>
                  upload, post, email, transmit, or otherwise make available any User-Provided Content that you do not have a right to make available under any law or under
                  contractual or fiduciary relationships (such as inside information, or proprietary and confidential information learned or disclosed as part of employment
                  relationships or under nondisclosure agreements);
                </li>
                <li>
                  upload, post, email, transmit, or otherwise make available any User-Provided Content that infringes any patent, trademark, trade secret, copyright, right of
                  publicity, or other proprietary right of any party;
                </li>
                <li>
                  upload, post, email, transmit, or otherwise make available any unsolicited or unauthorized advertising, promotional materials, "junk mail," "spam," "chain
                  letters," "pyramid schemes," or any other form of solicitation;
                </li>
                <li>
                  upload, post, email, transmit, or otherwise make available any material that contains software viruses or any other computer code, files, or programs designed to
                  interrupt, destroy, or limit the functionality of any computer software or hardware or telecommunications equipment;
                </li>
                <li>
                  take any action that interferes with the proper working of the Site, compromises the security of the Site, or otherwise damages the Site or any materials and
                  information available through the Site;
                </li>
                <li>
                  attempt to gain unauthorized access to any portion or feature of the Site, to any other systems or networks connected to the Site, to any of our servers, or to
                  any of the services offered on or through the Site by, including, but not limited to, hacking, password “mining”, or any other unauthorized means;
                </li>
                <li>
                  probe, scan, or test the vulnerability of the Site or any network connected to the Site or bypass the authentication measures on the Site or any network connected
                  to the Site;
                </li>
                <li>
                  use any automated means to collect information or content from or otherwise access the Site, including, but not limited to, through the use of technical tools
                  known as robots, spiders, or scrapers, without our prior permission;
                </li>
                <li>harvest or otherwise collect and store information about other users of the Site, including e-mail addresses;</li>
                <li>
                  install any software, file, or code that is not authorized by the user of a computer or mobile device or that assumes control of all or any part of the processing
                  performed by a computer or mobile device without the authorization of the user of the computer or mobile device;
                </li>
                <li>
                  take any action that would negatively affect <span class="keep-together">FM Global</span> in any manner; or
                </li>
                <li>
                  interfere with or disrupt the operation of the Site or server networks connected to the Site, reverse engineer, or disobey any requirements, procedures, policies,
                  or regulations of networks connected to the Site.
                </li>
              </ul>
              <rds-headline level={5}>LINKS TO OTHER WEBSITES AND SITES</rds-headline>
              <rds-text size="sm">
                For your convenience, the Site may contain links to or at times redirect you to other websites, mobile apps, and online services owned or controlled by third
                parties. Also, at your request, the Site may connect to social networking websites that are not owned or controlled by us.
              </rds-text>
              <rds-text size="sm">
                These other websites, mobile apps, and online services are not under our control, and you acknowledge and agree that we are not responsible or liable for the
                accuracy; collection, use, or disclosure of information; copyright compliance; legality; decency; or any other aspect of such websites, mobile apps, and online
                services or the content displayed on or through them. The inclusion of such a link does not imply our endorsement of any such website, mobile app, or online
                service, the content displayed on or through it, or any association with its operators, and you agree not to hold us responsible for any harm that may arise based
                on your access to or use of any linked website, mobile app, or online service.
              </rds-text>
              <rds-headline level={5}>REGISTRATION AND PASSWORDS</rds-headline>
              <rds-text size="sm">
                <span class="keep-together">FM Global</span> is using the <span class="keep-together">FM Global</span> registration process to manage end user identities for this
                Site. The Site requires you to register or obtain a password prior to permitting you to access the Site. You acknowledge and agree that you are responsible for
                maintaining the confidentiality of your login ID and password, and for all uses of your login ID, password, and/or Account. You agree to notify us immediately of
                any unauthorized use of your login ID, password, or Account, or any other breach of security involving access to the Site through your Account. You acknowledge that
                you may be held liable for any loss or harm incurred by us or any other person or entity due to someone else using your login ID, password, or Account as a result
                of your failing to keep your Account information secure and confidential.
              </rds-text>
              <rds-headline level={5}>OPERATION OF THE SITES</rds-headline>
              <rds-text size="sm">
                We reserve the right to do any of the following, at any time, at our sole discretion, with or without notice: (i) modify, suspend, or terminate operation of or your
                access to the Site, or any portion of the Site, including, but not limited to, for your violation of these Terms of Use; (ii) modify or change the Site, or any
                portion of the Site; and (iii) interrupt the regular operation of the Site, or any portion of the Site, as necessary to perform routine or non-routine maintenance,
                to correct errors, or to make other changes to the Site.
              </rds-text>
              <rds-headline level={5}>DISCLAIMER OF WARRANTIES</rds-headline>
              <rds-text size="sm">
                THE SITE AND ALL MATERIALS, INFORMATION, SOFTWARE, PRODUCTS, AND SERVICES INCLUDED IN OR AVAILABLE THROUGH THE SITE ARE PROVIDED "AS IS" AND "AS AVAILABLE" FOR YOUR
                USE. THE SITE AND ALL MATERIALS, INFORMATION, SOFTWARE, PRODUCTS, AND SERVICES INCLUDED IN OR AVAILABLE THROUGH THE SITE ARE PROVIDED WITHOUT WARRANTY OF ANY KIND,
                EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NONINFRINGEMENT. WE AND OUR
                AFFILIATES DO NOT WARRANT THAT THE MATERIALS, INFORMATION, SOFTWARE, PRODUCTS, AND SERVICES INCLUDED IN OR AVAILABLE THROUGH THE SITE ARE ACCURATE, RELIABLE, OR
                CORRECT; THAT THE SITE WILL BE AVAILABLE AT ANY PARTICULAR TIME OR LOCATION; THAT ANY DEFECTS OR ERRORS WILL BE CORRECTED; OR THAT THE SITE IS FREE OF VIRUSES OR
                OTHER HARMFUL COMPONENTS. YOUR USE OF THE SITE IS AT YOUR SOLE RISK. BECAUSE SOME JURISDICTIONS DO NOT PERMIT THE EXCLUSION OF CERTAIN WARRANTIES, THESE EXCLUSIONS
                MAY NOT APPLY TO YOU.
              </rds-text>
              <rds-headline level={5}>LIMITATION OF LIABILITY</rds-headline>
              <rds-text size="sm">
                UNDER NO CIRCUMSTANCES SHALL WE OR OUR AFFILIATES BE LIABLE FOR ANY DIRECT, INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING OUT OF OR IN
                ANY WAY CONNECTED WITH THE USE OF, OR INABILITY TO USE, THE SITE. THIS LIMITATION APPLIES WHETHER THE ALLEGED LIABILITY IS BASED ON CONTRACT, TORT, NEGLIGENCE,
                STRICT LIABILITY, OR OTHER LEGAL THEORY, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. IN THE EVENT SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION
                OR LIMITATION OF DAMAGES TO THE EXTENT INDICATED ABOVE, OUR LIABILITY IN SUCH JURISDICTIONS SHALL BE LIMITED TO THE EXTENT PERMITTED BY LAW.
              </rds-text>
              <rds-headline level={5}>INDEMNIFICATION</rds-headline>
              <rds-text size="sm">
                You agree to defend, indemnify, and hold us, our affiliates, subsidiaries, joint ventures, third-party service providers, and our respective employees, contractors,
                agents, officers, and directors harmless from all liabilities, claims, and expenses (including reasonable attorneys' fees) that arise out of or are related to any
                User-Provided Content you submit, post, transmit, or make available through the Site, your violation of these Terms of Use, your use or misuse of the Site, any work
                you perform in connection with the Site, or your violation of any third-party rights.
              </rds-text>
              <rds-headline level={5}>CHOICE OF LAW AND JURISDICTION</rds-headline>
              <rds-text size="sm">
                You agree that these Terms of Use will be governed by and construed in accordance with the laws of the State of Rhode Island without regard to the conflicts of
                laws, rules of any jurisdiction, and that any dispute arising out of or relating to these Terms of Use or your access to or use of the Site will be subject to the
                exclusive jurisdiction and venue of the courts located within the State of Rhode Island. You agree to the personal jurisdiction and venue of these courts. Because
                some jurisdictions do not permit the choice of law, jurisdiction, or venue, these requirements may not apply to you.
              </rds-text>
              <rds-headline level={5}>EQUITABLE RELIEF</rds-headline>
              <rds-text size="sm">
                You acknowledge that any breach or threatened breach of these Terms of Use will result in irreparable harm for which damages would not be an adequate remedy, and,
                therefore, in addition to our rights and remedies otherwise available at law, we shall be entitled to seek immediate equitable relief, including injunctive relief,
                as appropriate. If we seek any equitable remedies, we shall not be precluded or prevented from seeking remedies at law, nor shall we be deemed to have made an
                election of remedies.
              </rds-text>
              <rds-headline level={5}>SEVERABILITY</rds-headline>
              <rds-text size="sm">
                If any provision of these Terms of Use is held unenforceable or invalid under any applicable law or is so held by an applicable court decision, such
                unenforceability or invalidity will not render these Terms of Use unenforceable or invalid as a whole, and such provision will be changed and interpreted so as to
                best accomplish the objectives of such unenforceable or invalid provision within the limits of applicable law or the applicable court decisions.
              </rds-text>
              <rds-headline level={5}>WAIVER</rds-headline>
              <rds-text size="sm">
                Any waiver by us of a breach of any provision of these Terms of Use shall not operate as or be construed to be a waiver of any other breach of such provision or of
                any breach of any other provision of these Terms of Use. Any such waiver must be in writing. Failure by us to insist upon strict adherence to any term of these
                Terms of Use on one or more occasions shall not be considered a waiver or deprive us of the right to insist upon strict adherence to that term or any other term of
                these Terms of Use in the future.
              </rds-text>
              <rds-headline level={5}>CONTACT US</rds-headline>
              <rds-text size="sm">
                If you have any questions regarding these Terms of Use, please contact us by referring to the Contact Us mechanism provided in our Privacy Policy (link provided
                above).
              </rds-text>
            </rds-modal>
            <rds-link
              appearance="secondary"
              target="_blank"
              id="privacy-link"
              href="https://www.fmglobal.com/privacy-policy"
              onClick={() => {
                this.footerClickedHandler('privacy');
              }}
            >
              Privacy
            </rds-link>
            {this.confidentiality ? (
              <div>
                <rds-link
                  onClick={this.openConfidenialityModal}
                  onFocus={() => {
                    this.footerClickedHandler('confidentiality');
                  }}
                  id="confidentiality-link"
                  appearance="secondary"
                >
                  Confidentiality
                </rds-link>
                <rds-modal id="modal_confidential" headline="Confidentiality Notice" visible={false}>
                  This report has been developed for insurance underwriting purposes. It is provided to you for informational purposes only to reduce the possibility of loss to
                  insured property by bringing to your attention certain potential hazards or conditions. Life, safety, or health issues are not addressed. You must make the
                  decision whether to take any action. The company undertakes no duty to you or any other party by providing this report or the activities on which it is based. The
                  liability of the company is limited to that contained in its insurance policies.
                </rds-modal>
              </div>
            ) : (
              ''
            )}
            {this.survey ? (
              <rds-link
                appearance="secondary"
                href={this.surveyUrl}
                target="_blank"
                id="feedback-link"
                onClick={() => {
                  this.footerClickedHandler('feedback');
                }}
              >
                Give Feedback
              </rds-link>
            ) : (
              ''
            )}
            {this.help ? (
              <rds-link
                href={this.helpHref}
                appearance="secondary"
                id="help-link"
                onClick={() => {
                  this.footerClickedHandler('help');
                }}
              >
                Help
              </rds-link>
            ) : (
              ''
            )}
          </div>

          <div class="footer-copyright">
            &copy; 1999-{new Date().getFullYear()} <span class="keep-together">FM Global</span> All Rights Reserved. <span class="keep-together">FM Global</span> Risk Report® and
            RiskMark® are trademarks of Factory Mutual Insurance Company.
          </div>
        </div>
      </Host>
    );
  }
}
