declare module "aos" {
  interface AosOptions {
    disable?: boolean | "phone" | "tablet" | "mobile" | (() => boolean);
    duration?: number;
    easing?: string;
    offset?: number;
    once?: boolean;
  }

  const AOS: {
    init(options?: AosOptions): void;
  };

  export default AOS;
}
