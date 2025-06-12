"use client";

import ChatWindow from "@/components/organisms/ChatWindow";
import FurnitureWindow from "@/components/organisms/FurnitureWindow";
import Header from "@/components/organisms/Header";
import MovingWindow from "@/components/organisms/MovingWindow";
import PropertyWindow from "@/components/organisms/PropertyWindow";
import VRWindow from "@/components/organisms/VRWindow";
import { stepAtom } from "@/lib/atom/StepAtom";
import type { Furniture } from "@/lib/domain/FurnitureQuery";
import type { Property } from "@/lib/domain/PropertyQuery";
import UserGuardPage from "@/lib/guard/UserGuardPage";
import { Box, Flex } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import {
	type ImperativePanelHandle,
	Panel,
	PanelGroup,
	PanelResizeHandle,
} from "react-resizable-panels";

const dummyProperties: Property[] = [
	{
		id: "1",
		name: "Rajah Court",
		imageUrl:
			"https://www.prime-corporation.co.jp/app/uploads/sites/702/2024/03/0000000001128028412410000442601_10.jpg",
		address: "東京都豊島区池袋二丁目77番1号",
		description:
			"最上階角部屋 2面バルコニー 3口コンロでゆとりのあるキッチンスペース 宅配BOX完備で荷物の受け取りもスムーズ 申し込み受付中 お気軽にお問い合わせください",
	},
	{
		id: "2",
		name: "JMFレジデンス池袋一丁目",
		imageUrl:
			"https://www.jmf-reit.com/portfolio/ri4lk7000000230t-img/ri4lk7000000234h.jpg",
		address: "東京都豊島区池袋一丁目16番15号",
		description:
			"本物件は、「池袋」駅より徒歩9分の住宅エリアに立地しています。駅周辺には大型百貨店や家電量販店等の他、多数の飲食店が集積しており、本物件周辺にもミニスーパーや大型ディスカウントストアが存していることから、生活利便性は良好です。本物件は、2022年11月に竣工した12階建の新築マンションで、全戸（44戸）30㎡超の1LDKタイプです。コロナ禍で多様化した働き方に対応し、1階の共用部にはワークスペースが設置されています。",
	},
	{
		id: "3",
		name: "ジオエント池袋",
		imageUrl:
			"https://img.miraie-net.com/?v=l1SV8o4KiTGN67Vi6xp8yAaXh-hSvBzvt3EFwYViQGuFdX87PbDNo00JNJEYXM9AjusFTUUtGFr95lcXcm2jd_uFPk5j0Ghf8QmmmWPV2CVQV2OdZlOlQhGp1KmwQ0PN",
		address: "東京都豊島区南池袋二丁目32番5号",
		description:
			"ジオエント池袋は、東京都豊島区南池袋２丁目に位置し、東京メトロ有楽町線 東池袋駅やＪＲ山手線 池袋駅、東京メトロ丸ノ内線 池袋駅、都電荒川線 都電雑司ヶ谷駅へのアクセスが良好な立地です。鉄筋コンクリート造りの13階建てで、耐久性や防音性に優れた安心の建物です。オートロックやエレベーター、宅配BOX、インターネット接続可などの設備が整っており、安心で暮らしやすい建物として人気です。周辺にはまいばすけっとやセブンイレブン、ファミリーマートなどの便利な店舗が揃っています。ジオエント池袋は、快適な生活を求める方におすすめの物件です。",
	},
	{
		id: "4",
		name: "Rajah Court",
		imageUrl:
			"https://www.prime-corporation.co.jp/app/uploads/sites/702/2024/03/0000000001128028412410000442601_10.jpg",
		address: "東京都豊島区池袋二丁目77番1号",
		description:
			"最上階角部屋 2面バルコニー 3口コンロでゆとりのあるキッチンスペース 宅配BOX完備で荷物の受け取りもスムーズ 申し込み受付中 お気軽にお問い合わせください",
	},
	{
		id: "5",
		name: "JMFレジデンス池袋一丁目",
		imageUrl:
			"https://www.jmf-reit.com/portfolio/ri4lk7000000230t-img/ri4lk7000000234h.jpg",
		address: "東京都豊島区池袋一丁目16番15号",
		description:
			"本物件は、「池袋」駅より徒歩9分の住宅エリアに立地しています。駅周辺には大型百貨店や家電量販店等の他、多数の飲食店が集積しており、本物件周辺にもミニスーパーや大型ディスカウントストアが存していることから、生活利便性は良好です。本物件は、2022年11月に竣工した12階建の新築マンションで、全戸（44戸）30㎡超の1LDKタイプです。コロナ禍で多様化した働き方に対応し、1階の共用部にはワークスペースが設置されています。",
	},
	{
		id: "6",
		name: "ジオエント池袋",
		imageUrl:
			"https://img.miraie-net.com/?v=l1SV8o4KiTGN67Vi6xp8yAaXh-hSvBzvt3EFwYViQGuFdX87PbDNo00JNJEYXM9AjusFTUUtGFr95lcXcm2jd_uFPk5j0Ghf8QmmmWPV2CVQV2OdZlOlQhGp1KmwQ0PN",
		address: "東京都豊島区南池袋二丁目32番5号",
		description:
			"ジオエント池袋は、東京都豊島区南池袋２丁目に位置し、東京メトロ有楽町線 東池袋駅やＪＲ山手線 池袋駅、東京メトロ丸ノ内線 池袋駅、都電荒川線 都電雑司ヶ谷駅へのアクセスが良好な立地です。鉄筋コンクリート造りの13階建てで、耐久性や防音性に優れた安心の建物です。オートロックやエレベーター、宅配BOX、インターネット接続可などの設備が整っており、安心で暮らしやすい建物として人気です。周辺にはまいばすけっとやセブンイレブン、ファミリーマートなどの便利な店舗が揃っています。ジオエント池袋は、快適な生活を求める方におすすめの物件です。",
	},
	{
		id: "7",
		name: "Rajah Court",
		imageUrl:
			"https://www.prime-corporation.co.jp/app/uploads/sites/702/2024/03/0000000001128028412410000442601_10.jpg",
		address: "東京都豊島区池袋二丁目77番1号",
		description:
			"最上階角部屋 2面バルコニー 3口コンロでゆとりのあるキッチンスペース 宅配BOX完備で荷物の受け取りもスムーズ 申し込み受付中 お気軽にお問い合わせください",
	},
	{
		id: "8",
		name: "JMFレジデンス池袋一丁目",
		imageUrl:
			"https://www.jmf-reit.com/portfolio/ri4lk7000000230t-img/ri4lk7000000234h.jpg",
		address: "東京都豊島区池袋一丁目16番15号",
		description:
			"本物件は、「池袋」駅より徒歩9分の住宅エリアに立地しています。駅周辺には大型百貨店や家電量販店等の他、多数の飲食店が集積しており、本物件周辺にもミニスーパーや大型ディスカウントストアが存していることから、生活利便性は良好です。本物件は、2022年11月に竣工した12階建の新築マンションで、全戸（44戸）30㎡超の1LDKタイプです。コロナ禍で多様化した働き方に対応し、1階の共用部にはワークスペースが設置されています。",
	},
	{
		id: "9",
		name: "ジオエント池袋",
		imageUrl:
			"https://img.miraie-net.com/?v=l1SV8o4KiTGN67Vi6xp8yAaXh-hSvBzvt3EFwYViQGuFdX87PbDNo00JNJEYXM9AjusFTUUtGFr95lcXcm2jd_uFPk5j0Ghf8QmmmWPV2CVQV2OdZlOlQhGp1KmwQ0PN",
		address: "東京都豊島区南池袋二丁目32番5号",
		description:
			"ジオエント池袋は、東京都豊島区南池袋２丁目に位置し、東京メトロ有楽町線 東池袋駅やＪＲ山手線 池袋駅、東京メトロ丸ノ内線 池袋駅、都電荒川線 都電雑司ヶ谷駅へのアクセスが良好な立地です。鉄筋コンクリート造りの13階建てで、耐久性や防音性に優れた安心の建物です。オートロックやエレベーター、宅配BOX、インターネット接続可などの設備が整っており、安心で暮らしやすい建物として人気です。周辺にはまいばすけっとやセブンイレブン、ファミリーマートなどの便利な店舗が揃っています。ジオエント池袋は、快適な生活を求める方におすすめの物件です。",
	},
];

const mockFurnitures: Furniture[] = [
	{
		id: "1",
		name: "モダンソファ",
		imageUrl: "https://kagu350.com/uimg/135012-15.jpg",
		category: "ソファ",
		description:
			"シンプルなデザインの2人掛けモダンソファ。どんな部屋にもマッチします。",
	},
	{
		id: "2",
		name: "ナチュラルダイニングテーブル",
		imageUrl:
			"https://www.kaguha.com/client_info/MURAUCHI/itemimage/2044TAB000015/main_01_m.webp",
		category: "テーブル",
		description:
			"木のぬくもりが感じられるナチュラル仕上げのダイニングテーブルです。",
	},
	{
		id: "3",
		name: "北欧風チェア",
		imageUrl:
			"https://www.covearth.co.jp/user_data/packages/production/img/itemdetail2/F84056/F84056_13.jpg",
		category: "チェア",
		description: "北欧デザインの座り心地抜群なチェア。書斎やダイニングに最適。",
	},
	{
		id: "4",
		name: "収納付きベッド",
		imageUrl: "https://d277jmppmje79i.cloudfront.net/uimg/g134006-l.jpg",
		category: "ベッド",
		description:
			"引き出し付きで収納力抜群のシングルベッド。狭い部屋にもぴったり。",
	},
	{
		id: "5",
		name: "インダストリアルTVボード",
		imageUrl:
			"https://baseec-img-mng.akamaized.net/images/item/origin/bcc5da3e8f8f4bb3898dca0ddc1fb3f8.jpg",
		category: "収納家具",
		description:
			"スチールとウッドを組み合わせたTVボード。無骨なデザインが特徴。",
	},
	{
		id: "6",
		name: "ガラスローテーブル",
		imageUrl:
			"https://m.media-amazon.com/images/I/61xzo6DDCFS._AC_UF894,1000_QL80_.jpg",
		category: "テーブル",
		description: "ガラス天板のローテーブルでリビングをスタイリッシュに演出。",
	},
];

export default function Chat() {
	const ref = useRef<ImperativePanelHandle>(null);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);

	useEffect(() => {
		const handleDrop = (e: DragEvent) => {
			e.preventDefault();
			const file = e.dataTransfer?.files?.[0];
			if (file?.type.startsWith("image/")) {
				setImageFile(file);
				setImagePreview(URL.createObjectURL(file));
			}
		};

		const handlePaste = (e: ClipboardEvent) => {
			const items = e.clipboardData?.items;
			if (!items) return;
			for (const item of items) {
				if (item.kind === "file" && item.type.startsWith("image/")) {
					const file = item.getAsFile();
					if (file) {
						setImageFile(file);
						setImagePreview(URL.createObjectURL(file));
						break;
					}
				}
			}
		};

		const prevent = (e: Event) => e.preventDefault();

		window.addEventListener("drop", handleDrop);
		window.addEventListener("dragover", prevent);
		window.addEventListener("paste", handlePaste);

		return () => {
			window.removeEventListener("drop", handleDrop);
			window.removeEventListener("dragover", prevent);
			window.removeEventListener("paste", handlePaste);
		};
	}, []);

	const [step, setStep] = useAtom(stepAtom);
	const handleNext = () => {
		setStep((prev) => (prev + 1) % 4);
	};

	const renderLeftPanel = () => {
		switch (step) {
			case 0:
				return (
					<PropertyWindow properties={dummyProperties} onNext={handleNext} />
				);
			case 1:
				return (
					<FurnitureWindow furnitures={mockFurnitures} onNext={handleNext} />
				);
			case 2:
				return <VRWindow onNext={handleNext} />;
			case 3:
				return <MovingWindow onNext={handleNext} />;
			default:
				return null;
		}
	};

	return (
		<UserGuardPage>
			<Box h="100vh" display="flex" flexDirection="column" overflow="hidden">
				<Box flexShrink={0}>
					<Header />
				</Box>

				<Flex flex="1" minH={0}>
					<PanelGroup
						direction="horizontal"
						style={{ width: "100%", height: "100%" }}
					>
						<Panel defaultSize={65} minSize={30} maxSize={80}>
							<Box height="100%" overflowY="auto" width="100%">
								{renderLeftPanel()}
							</Box>
						</Panel>

						<PanelResizeHandle>
							<Box width="4px" height="100%" bg="blue.500" />
						</PanelResizeHandle>

						<Panel defaultSize={35} minSize={20} maxSize={70} ref={ref}>
							<Box
								h="100%"
								overflow="hidden"
								display="flex"
								flexDirection="column"
							>
								<ChatWindow
									imageFile={imageFile}
									imagePreview={imagePreview}
									onImageSelect={(file, previewUrl) => {
										setImageFile(file);
										setImagePreview(previewUrl);
									}}
									onImageClear={() => {
										setImageFile(null);
										setImagePreview(null);
									}}
								/>
							</Box>
						</Panel>
					</PanelGroup>
				</Flex>
			</Box>
		</UserGuardPage>
	);
}
