
import "bootstrap-icons/font/bootstrap-icons.css";
import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronUp, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin,
  faInstagram,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {

  return (
    <footer>
      {/* Back to Top */}
      <div className="back-to-top">
        <a href="#">
          <FontAwesomeIcon icon={faChevronUp} />
          <span>بازگشت به بالا</span>
        </a>
      </div>
      <div className="footer500px">
        <div className="footerlinks500px">
          <div className="footerlinks500pxdiv"><Link to={`/`} className="footerlinks500pxa" ><p className="footerlinks500pxp">راهنمای خرید از بقالی </p><FontAwesomeIcon icon={faChevronLeft} /></Link></div>
          <div className="footerlinks500pxdiv"><Link to={`/`} className="footerlinks500pxa" ><p className="footerlinks500pxp">درباره بقالی </p><FontAwesomeIcon icon={faChevronLeft} /></Link></div>
          <div className="footerlinks500pxdiv"><Link to={`/`} className="footerlinks500pxa" ><p className="footerlinks500pxp">با ما در ارتباط باشید </p><FontAwesomeIcon icon={faChevronLeft} /></Link></div>
          <div className="footerlinks500pxdiv"><Link to={`/`} className="footerlinks500pxa" ><p className="footerlinks500pxp">اطلاع از آخرین تخفیفات </p><FontAwesomeIcon icon={faChevronLeft} /></Link></div>
        </div>
        <div className="certifications">
          <div>
            <img
              src="https://fikoshop.ir/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsnapppay.225feaa9.png&w=1920&q=75"
              alt="snapp-pay"
            />
          </div>
          <div>
            <img
              src="https://ecunion.ir/logonama.png"
              alt="عضو اتحادیه کسب و کارهای مجازی"
            />
          </div>
          <div>
            <img
              src="https://mnchtuning.com/wp-content/uploads/2022/11/enamadt.png"
              alt="عضو اتحادیه کسب و کارهای مجازی"
            />
          </div>
          <div>
            <img
              src="https://setinmarket.net/wp-content/uploads/2022/07/samandehi.png"
              alt="ستاد ساماندهی"
            />
          </div>
        </div>
      </div>
      {/* Footer Content */}
      <div className="footer-content">
        <div className="footer-layout">
          {/* Right Column */}
          <div className="footer-right-column">
            {/* Footer Links */}
            <div className="footer-links">
              <div>
                <h3>راهنمای خرید از بقالی</h3>
                <ul>
                  <li><Link to={`/`} className="helplink" > نحوه ثبت سفارش</Link></li>
                  <li><Link to={`/`} className="helplink" > رویه ارسال سفارش</Link></li>
                  <li><Link to={`/`} className="helplink" > شیوه پرداخت</Link></li>
                  <li><Link to={`/`} className="helplink" > پیگیری سفارش</Link></li>
                </ul>
              </div>
              <div>
                <h3>درباره بقالی</h3>
                <ul>
                  <li><Link to={`/`} className="helplink" > درباره ما</Link></li>
                  <li><Link to={`/`} className="helplink" > تماس با ما</Link></li>
                  <li><Link to={`/`} className="helplink" > سوالات متداول</Link></li>
                  <li><Link to={`/`} className="helplink" > تماس با پشتیبانی</Link></li>
                </ul>
              </div>
            </div>

            {/* Certifications */}
            <div className="certifications">
              <div>
                <img
                  src="https://fikoshop.ir/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsnapppay.225feaa9.png&w=1920&q=75"
                  alt="snapp-pay"
                />
              </div>
              <div>
                <img
                  src="https://ecunion.ir/logonama.png"
                  alt="عضو اتحادیه کسب و کارهای مجازی"
                />
              </div>
              <div>
                <img
                  src="https://mnchtuning.com/wp-content/uploads/2022/11/enamadt.png"
                  alt="عضو اتحادیه کسب و کارهای مجازی"
                />
              </div>
              <div>
                <img
                  src="https://setinmarket.net/wp-content/uploads/2022/07/samandehi.png"
                  alt="ستاد ساماندهی"
                />
              </div>
            </div>
          </div>
          {/* Left Column */}
          <div className="footer-left-column">
            {/* Social Media */}
            <div className="social-media">
              <p>با ما در ارتباط باشید</p>
              <div className="social-icons">
                <a href="https://linkedin.com" aria-label="LinkedIn">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a href="https://instagram.com" aria-label="Instagram">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="https://telegram.com" aria-label="Telegram">
                  <FontAwesomeIcon icon={faTelegram} />
                </a>
              </div>
            </div>
            {/* Email Subscription */}
            <div className="email-subscription">
              <p className="pfooter">برای اطلاع از آخرین تخفیف‌ها،  <span className="boldpfooter"> ایمیل </span> خود را ثبت نمایید</p>
              <form>
                <input type="email" placeholder="ایمیل شما" />
                <button type="submit">
                  <FontAwesomeIcon icon={faEnvelope} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer >
  );
};

export default Footer;
