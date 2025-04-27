/* eslint-disable react/no-unescaped-entities */
"use client";

import type React from "react";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Building,
  CreditCard,
  Printer,
  Receipt,
  Settings2,
  ShieldCheck
} from "lucide-react";

export default function SettingsPage() {
  const [storeSettings, setStoreSettings] = useState({
    storeName: "Grocery Store",
    address: "1234 Main St, Anytown, CA 12345",
    phone: "(555) 123-4567",
    email: "info@grocerystore.com",
    taxId: "12-3456789"
  });

  const [receiptSettings, setReceiptSettings] = useState({
    headerText: "Thank you for shopping with us!",
    footerText: "Please come again soon.",
    showLogo: true,
    showTaxId: true,
    printDuplicate: false,
    receiptWidth: "80mm",
    fontSize: "normal"
  });

  const [taxSettings, setTaxSettings] = useState({
    defaultTaxRate: "7.00",
    enableTaxExemption: true,
    taxCategories: [
      { id: 1, name: "Standard", rate: "7.00" },
      { id: 2, name: "Food", rate: "0.00" },
      { id: 3, name: "Alcohol", rate: "10.00" }
    ]
  });

  const [paymentSettings, setPaymentSettings] = useState({
    acceptCash: true,
    acceptCreditCards: true,
    acceptDebitCards: true,
    acceptChecks: false,
    acceptGiftCards: true,
    requireSignature: true,
    signatureThreshold: "25.00"
  });

  const handleStoreSettingsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setStoreSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleReceiptSettingsChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setReceiptSettings((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleReceiptToggleChange = (name: string, checked: boolean) => {
    setReceiptSettings((prev) => ({ ...prev, [name]: checked }));
  };

  const handlePaymentToggleChange = (name: string, checked: boolean) => {
    setPaymentSettings((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSaveSettings = () => {
    // In a real app, this would save to the database
    alert("Settings saved successfully!");
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Settings</h1>
          <Button onClick={handleSaveSettings}>Save Changes</Button>
        </div>

        <Tabs defaultValue="store">
          <TabsList className="grid grid-cols-4 w-full max-w-3xl mb-6">
            <TabsTrigger value="store">
              <Building className="mr-2 h-4 w-4" />
              Store
            </TabsTrigger>
            <TabsTrigger value="receipt">
              <Receipt className="mr-2 h-4 w-4" />
              Receipt
            </TabsTrigger>
            <TabsTrigger value="payment">
              <CreditCard className="mr-2 h-4 w-4" />
              Payment
            </TabsTrigger>
            <TabsTrigger value="system">
              <Settings2 className="mr-2 h-4 w-4" />
              System
            </TabsTrigger>
          </TabsList>

          <TabsContent value="store">
            <Card>
              <CardHeader>
                <CardTitle>Store Information</CardTitle>
                <CardDescription>
                  Manage your store details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="storeName">Store Name</Label>
                    <Input
                      id="storeName"
                      name="storeName"
                      value={storeSettings.storeName}
                      onChange={handleStoreSettingsChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxId">Tax ID / Business Number</Label>
                    <Input
                      id="taxId"
                      name="taxId"
                      value={storeSettings.taxId}
                      onChange={handleStoreSettingsChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={storeSettings.address}
                    onChange={handleStoreSettingsChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={storeSettings.phone}
                      onChange={handleStoreSettingsChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      value={storeSettings.email}
                      onChange={handleStoreSettingsChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Tax Settings</CardTitle>
                <CardDescription>
                  Configure tax rates and exemptions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="defaultTaxRate">Default Tax Rate (%)</Label>
                    <Input
                      id="defaultTaxRate"
                      type="number"
                      step="0.01"
                      value={taxSettings.defaultTaxRate}
                      onChange={(e) =>
                        setTaxSettings((prev) => ({
                          ...prev,
                          defaultTaxRate: e.target.value
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2 flex items-center">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="enableTaxExemption"
                        checked={taxSettings.enableTaxExemption}
                        onCheckedChange={(checked) =>
                          setTaxSettings((prev) => ({
                            ...prev,
                            enableTaxExemption: checked
                          }))
                        }
                      />
                      <Label htmlFor="enableTaxExemption">
                        Enable Tax Exemption
                      </Label>
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div>
                  <h3 className="text-sm font-medium mb-3">Tax Categories</h3>
                  <div className="space-y-2">
                    {taxSettings.taxCategories.map((category) => (
                      <div
                        key={category.id}
                        className="flex items-center space-x-4"
                      >
                        <div className="flex-1">{category.name}</div>
                        <div className="w-24">
                          <Input
                            type="number"
                            step="0.01"
                            value={category.rate}
                            onChange={(e) => {
                              const newCategories =
                                taxSettings.taxCategories.map((c) =>
                                  c.id === category.id
                                    ? { ...c, rate: e.target.value }
                                    : c
                                );
                              setTaxSettings((prev) => ({
                                ...prev,
                                taxCategories: newCategories
                              }));
                            }}
                          />
                        </div>
                        <div>%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="receipt">
            <Card>
              <CardHeader>
                <CardTitle>Receipt Customization</CardTitle>
                <CardDescription>
                  Customize how receipts are printed and displayed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="headerText">Receipt Header Text</Label>
                      <Textarea
                        id="headerText"
                        name="headerText"
                        value={receiptSettings.headerText}
                        onChange={handleReceiptSettingsChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="footerText">Receipt Footer Text</Label>
                      <Textarea
                        id="footerText"
                        name="footerText"
                        value={receiptSettings.footerText}
                        onChange={handleReceiptSettingsChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="showLogo"
                          checked={receiptSettings.showLogo}
                          onCheckedChange={(checked) =>
                            handleReceiptToggleChange("showLogo", checked)
                          }
                        />
                        <Label htmlFor="showLogo">
                          Show Store Logo on Receipt
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="showTaxId"
                          checked={receiptSettings.showTaxId}
                          onCheckedChange={(checked) =>
                            handleReceiptToggleChange("showTaxId", checked)
                          }
                        />
                        <Label htmlFor="showTaxId">
                          Show Tax ID on Receipt
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="printDuplicate"
                          checked={receiptSettings.printDuplicate}
                          onCheckedChange={(checked) =>
                            handleReceiptToggleChange("printDuplicate", checked)
                          }
                        />
                        <Label htmlFor="printDuplicate">
                          Print Duplicate Receipt
                        </Label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="receiptWidth">Receipt Width</Label>
                      <Select
                        value={receiptSettings.receiptWidth}
                        onValueChange={(value) =>
                          setReceiptSettings((prev) => ({
                            ...prev,
                            receiptWidth: value
                          }))
                        }
                      >
                        <SelectTrigger id="receiptWidth">
                          <SelectValue placeholder="Select width" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="58mm">58mm (2.28")</SelectItem>
                          <SelectItem value="80mm">80mm (3.15")</SelectItem>
                          <SelectItem value="112mm">112mm (4.41")</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fontSize">Font Size</Label>
                      <Select
                        value={receiptSettings.fontSize}
                        onValueChange={(value) =>
                          setReceiptSettings((prev) => ({
                            ...prev,
                            fontSize: value
                          }))
                        }
                      >
                        <SelectTrigger id="fontSize">
                          <SelectValue placeholder="Select font size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button variant="outline">
                    <Printer className="mr-2 h-4 w-4" />
                    Print Test Receipt
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>
                  Configure accepted payment methods and settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">
                      Accepted Payment Methods
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="acceptCash"
                          checked={paymentSettings.acceptCash}
                          onCheckedChange={(checked) =>
                            handlePaymentToggleChange("acceptCash", checked)
                          }
                        />
                        <Label htmlFor="acceptCash">Cash</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="acceptCreditCards"
                          checked={paymentSettings.acceptCreditCards}
                          onCheckedChange={(checked) =>
                            handlePaymentToggleChange(
                              "acceptCreditCards",
                              checked
                            )
                          }
                        />
                        <Label htmlFor="acceptCreditCards">Credit Cards</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="acceptDebitCards"
                          checked={paymentSettings.acceptDebitCards}
                          onCheckedChange={(checked) =>
                            handlePaymentToggleChange(
                              "acceptDebitCards",
                              checked
                            )
                          }
                        />
                        <Label htmlFor="acceptDebitCards">Debit Cards</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="acceptChecks"
                          checked={paymentSettings.acceptChecks}
                          onCheckedChange={(checked) =>
                            handlePaymentToggleChange("acceptChecks", checked)
                          }
                        />
                        <Label htmlFor="acceptChecks">Checks</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="acceptGiftCards"
                          checked={paymentSettings.acceptGiftCards}
                          onCheckedChange={(checked) =>
                            handlePaymentToggleChange(
                              "acceptGiftCards",
                              checked
                            )
                          }
                        />
                        <Label htmlFor="acceptGiftCards">Gift Cards</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">
                      Card Payment Settings
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="requireSignature"
                          checked={paymentSettings.requireSignature}
                          onCheckedChange={(checked) =>
                            handlePaymentToggleChange(
                              "requireSignature",
                              checked
                            )
                          }
                        />
                        <Label htmlFor="requireSignature">
                          Require Signature
                        </Label>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signatureThreshold">
                          Signature Threshold ($)
                        </Label>
                        <Input
                          id="signatureThreshold"
                          type="number"
                          step="0.01"
                          value={paymentSettings.signatureThreshold}
                          onChange={(e) =>
                            setPaymentSettings((prev) => ({
                              ...prev,
                              signatureThreshold: e.target.value
                            }))
                          }
                          disabled={!paymentSettings.requireSignature}
                        />
                        <p className="text-sm text-gray-500">
                          Signatures will be required for transactions above
                          this amount
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>
                  Configure system behavior and security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Security</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Switch id="requirePasswordForRefunds" defaultChecked />
                        <Label htmlFor="requirePasswordForRefunds">
                          Require Password for Refunds
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch id="requirePasswordForVoids" defaultChecked />
                        <Label htmlFor="requirePasswordForVoids">
                          Require Password for Voids
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch id="autoLogout" defaultChecked />
                        <Label htmlFor="autoLogout">
                          Auto Logout After Inactivity
                        </Label>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="inactivityTimeout">
                          Inactivity Timeout (minutes)
                        </Label>
                        <Input
                          id="inactivityTimeout"
                          type="number"
                          defaultValue="15"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-3">Backup & Data</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Switch id="autoBackup" defaultChecked />
                        <Label htmlFor="autoBackup">
                          Automatic Daily Backup
                        </Label>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="backupTime">Backup Time</Label>
                        <Select defaultValue="23:00">
                          <SelectTrigger id="backupTime">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="00:00">12:00 AM</SelectItem>
                            <SelectItem value="03:00">3:00 AM</SelectItem>
                            <SelectItem value="23:00">11:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="pt-2">
                        <Button variant="outline" className="w-full">
                          <ShieldCheck className="mr-2 h-4 w-4" />
                          Backup Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-2" />

                <div>
                  <h3 className="text-sm font-medium mb-3">
                    System Maintenance
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline">Clear Transaction Cache</Button>
                    <Button variant="outline">Rebuild Search Index</Button>
                    <Button variant="outline">Check for Updates</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
