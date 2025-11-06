export interface FAQ {
  question: string;
  answer: string;
}

export interface FAQData {
  general: FAQ[];
  installation: FAQ[];
  maintenance: FAQ[];
  ordering: FAQ[];
  technical: FAQ[];
}

export const faqData: FAQData = {
  general: [
    {
      question: 'What types of ceramic tiles do you offer?',
      answer: 'We offer a comprehensive range of ceramic tiles including floor tiles, wall tiles, vitrified tiles, porcelain tiles, and designer tiles. Our collections feature products from BHL Ceramic, Kenyh Ceramic, Vinci Ceramic, and Babele San Vitale.'
    },
    {
      question: 'How do I choose the right tile for my space?',
      answer: 'Consider factors like room usage, foot traffic, moisture levels, and design aesthetic. Our Tile Quiz tool can help recommend suitable options, or you can consult with our design experts for personalized advice.'
    },
    {
      question: 'Do you offer design consultation services?',
      answer: 'Yes! We provide free design consultations to help you select the perfect tiles for your project. Contact us through our Contact page or call +91 9093833833 to schedule an appointment.'
    },
    {
      question: 'Can I order tile samples before purchasing?',
      answer: 'Absolutely! We encourage customers to order physical samples to see the quality, color, and texture before making a final decision. Visit our Sample Request page to order samples.'
    }
  ],
  installation: [
    {
      question: 'Do you provide installation services?',
      answer: 'We work with a network of certified installers across India. Contact us for installer recommendations in your area, or visit our Resources page for DIY installation guides.'
    },
    {
      question: 'How do I calculate how many tiles I need?',
      answer: 'Use our Tile Calculator tool which automatically calculates the required quantity based on your room dimensions, including wastage allowance. We recommend ordering 10% extra for cuts and future repairs.'
    },
    {
      question: 'What is the typical installation time?',
      answer: 'Installation time varies based on area size and complexity. On average, a professional can install 30-50 sq ft per day. A standard bathroom (100 sq ft) typically takes 2-3 days including prep work and grouting.'
    },
    {
      question: 'Can tiles be installed over existing flooring?',
      answer: 'In some cases, yes, but it depends on the existing surface condition. The substrate must be flat, clean, and structurally sound. Consult with a professional installer for best results.'
    }
  ],
  maintenance: [
    {
      question: 'How do I clean and maintain ceramic tiles?',
      answer: 'Regular sweeping and mopping with a pH-neutral cleaner is sufficient for most ceramic tiles. Avoid harsh chemicals or abrasive scrubbers. For detailed care instructions, visit our Resources page.'
    },
    {
      question: 'Are your tiles stain-resistant?',
      answer: 'Our vitrified and porcelain tiles are highly stain-resistant due to their low porosity. Glazed ceramic tiles also offer excellent stain resistance. Always clean spills promptly for best results.'
    },
    {
      question: 'How long do ceramic tiles last?',
      answer: 'With proper installation and maintenance, high-quality ceramic tiles can last 50+ years. Our tiles come with manufacturer warranties covering defects. Check individual product specifications for details.'
    },
    {
      question: 'Can I use the same tiles for walls and floors?',
      answer: 'Wall tiles are typically not suitable for floors due to lower durability ratings. However, floor tiles can be used on walls. Check the product specifications for recommended applications.'
    }
  ],
  ordering: [
    {
      question: 'What is your minimum order quantity?',
      answer: 'Minimum order quantities vary by product and collection. Contact our sales team for specific MOQ information. We accommodate both small residential projects and large commercial orders.'
    },
    {
      question: 'How long does delivery take?',
      answer: 'Delivery time depends on your location and product availability. Typically, in-stock items are delivered within 5-10 business days. Custom orders may take 3-4 weeks. We provide tracking information for all orders.'
    },
    {
      question: 'Do you offer bulk discounts for large projects?',
      answer: 'Yes! We offer competitive pricing for bulk orders and trade customers. Contact our sales team at +91 9093833833 for volume pricing and special trade rates.'
    },
    {
      question: 'What is your return and exchange policy?',
      answer: 'Unused tiles in original packaging can be returned within 30 days of delivery. Defective products are replaced free of charge. Custom orders are non-returnable unless defective. Contact customer service for return authorization.'
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Currently, we serve customers across India. For international shipping inquiries, please contact our export team at info@origintiles.com.'
    }
  ],
  technical: [
    {
      question: 'What is the difference between ceramic and porcelain tiles?',
      answer: 'Porcelain tiles are denser, less porous, and more durable than ceramic tiles. Porcelain is fired at higher temperatures making it ideal for high-traffic areas and outdoor use. Ceramic tiles are more affordable and suitable for walls and low-traffic areas.'
    },
    {
      question: 'What does PEI rating mean?',
      answer: 'PEI (Porcelain Enamel Institute) rating measures tile durability from 1-5. PEI 1-2: walls only; PEI 3: light traffic; PEI 4: medium to heavy traffic; PEI 5: heavy commercial traffic. Check product specifications for ratings.'
    },
    {
      question: 'Are your tiles slip-resistant?',
      answer: 'We offer tiles with various slip-resistance ratings. Look for R-rating or COF (Coefficient of Friction) values in product specifications. For wet areas, we recommend R10+ or COF >0.6.'
    },
    {
      question: 'What tile size should I choose?',
      answer: 'Larger tiles (24"x24" or bigger) make small spaces appear larger and have fewer grout lines. Smaller tiles are better for areas requiring slopes (showers) and curved surfaces. Consider your space size and design aesthetic.'
    }
  ]
};
